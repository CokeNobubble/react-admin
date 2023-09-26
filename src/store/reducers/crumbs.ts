export type ITags = {
  path: string;
  name: string;
};

let initState = {
  tags: [],
  activeTag: {},
};
export default (state = initState, action) => {
  const { type, data } = action;
  console.log(type, data);
  switch (type) {
    case "1":
      return {};
    default:
      return state;
  }
};
