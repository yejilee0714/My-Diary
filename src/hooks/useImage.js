import { useState } from "react";

const baseURL = "https://api.mandarin.weniv.co.kr";

// 파일 검사 함수
function isValidFile(file) {
  if (!file) return;
  const fileNameArray = file.name.split(".");
  const fileExtension = fileNameArray[fileNameArray.length - 1];
  const fileExtensionValues = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

  // 확장자 검사
  if (!fileExtensionValues.includes(fileExtension)) {
    alert("이미지 파일만 업로드 가능합니다.");
    return false;
    // 파일 용량 검사
  } else if (file.size > 10000000) {
    alert("10MB 미만의 파일만 업로드 가능합니다.");
    return false;
  } else {
    return true;
  }
}

export function useMultiImage() {
  const [image, setImage] = useState(null);

  async function inputImageHandler(e) {
    const formData = new FormData();
    const userImage = e.target.files[0];

    if (!isValidFile(userImage)) return;

    formData.append("image", userImage);

    const res = await fetch(`${baseURL}/image/uploadfile`, {
      method: "post",
      body: formData,
    });
    const json = await res.json();

    setImage((prev) => (prev ? prev + `,${baseURL}/${json.filename}` : `${baseURL}/${json.filename}`));
  }

  return { image, setImage, inputImageHandler };
}

export function useImage(initial) {
  const [image, setImage] = useState(initial || null);

  async function inputImageHandler(e) {
    const formData = new FormData();
    const userImage = e.target.files[0];

    if (!isValidFile(userImage)) return;

    formData.append("image", userImage);

    const res = await fetch(`${baseURL}/image/uploadfile`, {
      method: "post",
      body: formData,
    });
    const json = await res.json();

    setImage(`${baseURL}/${json.filename}`);
  }
  return { image, setImage, inputImageHandler };
}