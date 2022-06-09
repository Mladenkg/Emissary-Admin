import {
  ADD_NEW_SLIDE,
  DELETE_SLIDE,
  LOAD_SLIDERS_LIST,
  SliderSettingsActions,
} from "../../types/actions/SliderSettings.actions";
import {
  SliderData,
} from "../../types/models/SliderSettings";

const initialState: {
  sliderData: SliderData[];
} = {
  sliderData: [],
};

const SliderSettingsCardReducer = (state = initialState, action: SliderSettingsActions) => {
  switch (action.type) {

    case ADD_NEW_SLIDE:
      return {
        ...state
      };

    case DELETE_SLIDE:
      return {
        ...state
      };

    case LOAD_SLIDERS_LIST:
      return {
        ...state
      };

    default:
      return state;
  }
};
export default SliderSettingsCardReducer;
