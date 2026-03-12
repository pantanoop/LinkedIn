export const buildCommentTree = (comments: any[]) => {
  const map: any = {};
  const roots: any[] = [];

  comments.forEach((comment) => {
    map[comment.commentId] = { ...comment, replies: [] };
  });

  comments.forEach((comment) => {
    if (comment.parentId) {
      const parent = map[comment.parentId];
      if (parent) {
        parent.replies.push(map[comment.commentId]);
      }
    } else {
      roots.push(map[comment.commentId]);
    }
  });

  return roots;
};
