import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { GetMessagesService } from '../../features/messages/get_messages/get_messages.service';
import { SendMessageService } from '../../features/messages/send_message/send_messages.service';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly sendMessageService: SendMessageService,
    private readonly getMessagesService: GetMessagesService,
  ) {}

  @WebSocketServer() server: Server;

  private userToSocket = new Map<string, string>();
  private socketToUser = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log('Connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const userId = this.socketToUser.get(client.id);

    if (userId) {
      this.userToSocket.delete(userId);
      this.socketToUser.delete(client.id);
    }

    console.log('Disconnected:', client.id);
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.userToSocket.set(userId, client.id);
    this.socketToUser.set(client.id, userId);

    console.log('Users:', this.userToSocket);
  }
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const { senderId, receiverId, text, mediaUrls } = data;

    const message = await this.sendMessageService.sendMessage(
      senderId,
      receiverId,
      text,
      mediaUrls,
    );
    const receiverSocket = this.userToSocket.get(receiverId);
    if (receiverSocket) {
      this.server.to(receiverSocket).emit('newMessage', message);
    }
    client.emit('newMessage', message);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() data: { senderId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { senderId, receiverId } = data;

    const conversation = await this.sendMessageService[
      'createConversationService'
    ].create_convo(senderId, receiverId);

    const messages = await this.getMessagesService.getMessages(conversation.id);

    client.emit('messages', messages);
  }
}
