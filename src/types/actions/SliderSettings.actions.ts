import {
  SliderData,
} from "../models/SliderSettings";

export const ADD_NEW_SLIDE = "ADD_NEW_SLIDE";
export const DELETE_SLIDE = "DELETE_SLIDE";
export const LOAD_SLIDERS_LIST = "LOAD_SLIDERS_LIST";

export interface AddNewSlideAction {
  type: typeof ADD_NEW_SLIDE;
  payload: SliderData;
}

export interface DeleteSlideAction {
  type: typeof DELETE_SLIDE;
  payload: SliderData;
}

export interface LoadSliderListAction {
  type: typeof LOAD_SLIDERS_LIST;
  payload: {
    list: SliderData[];
  };
}

export type SliderSettingsActions =
  | AddNewSlideAction
  | DeleteSlideAction
  | LoadSliderListAction
