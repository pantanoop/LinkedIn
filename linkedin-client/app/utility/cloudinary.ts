export const uploadToCloudinary = async (files: File[]) => {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/djstagikq/auto/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    urls.push(data.secure_url);
  }

  return urls;
};
