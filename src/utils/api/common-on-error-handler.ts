import { toast } from "react-toastify";
import { GENERAL_ERROR_MESSAGE } from "../../config/common/messages";
import type { AxiosError } from "axios";
import type { CommonErrorResponse } from "../../types/api";

export function commonOnErrorHandler(response: AxiosError<CommonErrorResponse>) {
  console.log("Error to implement", response.response?.data.message ?? GENERAL_ERROR_MESSAGE);
  toast.error(response.response?.data.message ?? GENERAL_ERROR_MESSAGE);
  // TODO -istevanovic
}
