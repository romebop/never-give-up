export default function counter(state = {total: 0, today: 0, best: 0}, action) {
  switch (action.type) {
    case 'PRESS':
      return {
        total: state.total + 1, 
        today: state.today + 1,
        best: state.best,
      };
    case 'RESET':
      return { 
        total: state.total, 
        today: 0,
        best: Math.max(state.best, state.today), 
      };
    case 'RECEIVE':
      return {
        total: +action.total,
        today: +action.today,
        best: +action.best,
      };
    default:
      return state;
  }
}
