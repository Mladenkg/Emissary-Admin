import { Dispatch } from "redux";
import { AppActions } from "../../types";
import { fetchError, fetchStart, fetchSuccess, showMessage } from "./Common";
import {
  ADD_NEW_SLIDE,
  DELETE_SLIDE,
  LOAD_SLIDERS_LIST,
} from "../../types/actions/SliderSettings.actions";
import { SliderData } from "../../types/models/SliderSettings";
import jwtAxios from "@crema/services/auth/jwt-auth";
import { appIntl } from "@crema/utility/helper/Utils";
import objectToFormData from "./../../utils/api/object-to-form-data";

export const onLoadSliderList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/admin/sliders", {
        params: {},
      })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: LOAD_SLIDERS_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onAddNewSlide = (
  data: SliderData
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    let formData = objectToFormData(data);
    dispatch(fetchStart());
    jwtAxios
      .post("/admin/sliders", formData)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ADD_NEW_SLIDE, payload: data.data });
          dispatch(showMessage(String(messages["sliderSettings.form.successAddedNewSlide"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};

export const onDeleteSlide = (
  id: string
) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .delete(`/admin/sliders/${id}`)
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: DELETE_SLIDE, payload: data.data });
          dispatch(showMessage(String(messages["sliderSettings.form.successDeletedSlide"])));
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch(() => {
        dispatch(fetchError(String(messages["message.somethingWentWrong"])));
      });
  };
};
