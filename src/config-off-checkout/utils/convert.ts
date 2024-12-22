export const convertImageToBinaryString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const binaryString = Array.from(new Uint8Array(arrayBuffer))
        .map((byte) => String.fromCharCode(byte))
        .join('');
      resolve(binaryString);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
  });
};
