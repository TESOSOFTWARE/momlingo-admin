// components

// ----------------------------------------------------------------------

export default function getFileData(file: { image: string } | string, index?: number) {
  if (typeof file === 'string') {
    return {
      key: index ? `${file}-${index}` : file,
      preview: file,
    };
  }

  return {
    // key: index ? `${file.name}-${index}` : file.name,
    // path: file.path,
    // type: file.type,
    preview: file?.image,
    // lastModified: file.lastModified,
    // lastModifiedDate: file.lastModifiedDate,
  };
}
