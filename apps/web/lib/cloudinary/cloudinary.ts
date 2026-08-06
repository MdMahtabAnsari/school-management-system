import axios from "axios";
import { UploadApiResponse } from "cloudinary";
import { CreateSignedUploadUrlInput } from '@workspace/contract/cloudinary/input/create-signed-up-upload-url';
import {createSignedUploadUrl} from '@workspace/api-client/cloudinary/cloudinary';

export async function signedUpload(
  input: CreateSignedUploadUrlInput & {
    file: File;
    onProgress?: (progress: number) => void;
    signal?: AbortSignal;
  }
): Promise<UploadApiResponse> {
      const {
    file,
    onProgress,
    signal,
    ...signedUploadInput
  } = input;
  const response = await createSignedUploadUrl(signedUploadInput);

  const {
    url,
    publicId,
    apiKey,
    timestamp,
    eager,
    folder,
    signature,
  } = response;

  const formData = new FormData();

  formData.append("file", input.file);
  formData.append("public_id", publicId);
  formData.append("api_key", apiKey ?? "");
  formData.append("timestamp", timestamp);

  if (eager) {
    formData.append("eager", eager);
  }

  if (folder) {
    formData.append("folder", folder);
  }

  formData.append("signature", signature);

  const upload = await axios.post<UploadApiResponse>(url, formData, {
    signal: input.signal,
    onUploadProgress(event) {
      if (!event.total) return;

      const progress = Math.round((event.loaded * 100) / event.total);
      input.onProgress?.(progress);
    },
  });

  return upload.data;
}