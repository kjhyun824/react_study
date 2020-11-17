// Departments (Reducers)
const claimsHistory = (prev_list = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...prev_list, action.payload];
  }

  return prev_list;
};

const accounting = (curr_account = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return curr_account - action.payload.claim_amount;
  } else if (action.type === 'CREATE_POLICY') {
    return curr_account + action.payload.amount;
  }

  return curr_account;
};

const policies = (list_policies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...list_policies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return list_policies.filter((name) => name !== action.payload.name);
  }

  return list_policies;
};
