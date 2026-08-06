import {apiClient} from '../api.js';
import { CreateSignedUploadUrlInput } from '@workspace/contract/cloudinary/input/create-signed-up-upload-url';
import {CreateSignedUploadUrlOutput} from '@workspace/contract/cloudinary/output/create-signed-upload-url';

export async function createSignedUploadUrl(input: CreateSignedUploadUrlInput): Promise<CreateSignedUploadUrlOutput> {
  const response = await apiClient.post<CreateSignedUploadUrlOutput>('/cloudinary/signed-upload-url', input);
  return response.data;
}