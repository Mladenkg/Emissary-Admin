export default function objectToFormData(data: object) {
  const formData = new FormData();

  for (const key in data) {
    if (!data.hasOwnProperty(key)) {
      continue;
    }

    let item: any = data[key as keyof object];

    if (item == null) {
      continue;
    }

    // Converting ONLY booleans to 0 or 1
    if (item === false) {
      item = 0;
    } else if (item === true) {
      item = 1;
    }

    formData.append(key, item);
  }

  return formData;
}
