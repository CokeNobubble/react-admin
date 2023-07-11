let number = 0

type IAction = {
  data: number,
  type: string
}
export default (state = number, action: IAction) => {
  switch (action.type) {
    case 'add':
      return number = state + action.data
    case 'reduce':
      return number = state - action.data
    default:
      return state
  }
}
