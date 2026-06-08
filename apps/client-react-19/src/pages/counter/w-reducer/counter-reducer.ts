type CounterState = {
  count: number;
};

type CounterAction =
  | { type: "INC"; payload?: number }
  | { type: "DEC"; payload?: number }
  | { type: "RESET" };

export const INITIAL_STATE: CounterState = {
  count: 0,
};

export const counterReducer = (
  state: CounterState,
  action: CounterAction,
): CounterState => {
  // console.log(action);
  switch (action.type) {
    case "DEC":
      return {
        ...state,
        count: state.count - (action.payload ?? 1),
      };
    case "INC":
      return {
        ...state,
        count: state.count + (action.payload ?? 1),
      };
    case "RESET":
      return INITIAL_STATE;
    default: {
      // Exhaustive check for TypeScript
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
  // throw new Error(`Unknown Type: ${action.type}`);
  // return state;
};
