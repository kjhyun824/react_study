store.dispatch(createPolicy('jh', 20));
store.dispatch(createPolicy('bs', 30));
store.dispatch(createPolicy('jp', 40));

store.dispatch(createClaim('jh', 120));
store.dispatch(createClaim('bs', 50));

store.dispatch(deletePolicy('jp'));

console.log(store.getState());
