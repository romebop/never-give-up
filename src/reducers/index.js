export default function counter(state = {total: 0, today: 0}, action) {
  switch (action.type) {
    case 'PRESS':
      return {
        total: state.total + 1, 
        today: state.today + 1,
      };
    case 'RESET':
      return { 
        total: state.total, 
        today: 0,
      };
    case 'RECEIVE':
      return {
        total: +action.total,
        today: +action.today,
      };
    default:
      return state;
  }
}
