// People dropping off a form (Action Creators)
const createPolicy = (name, amount) => {
  return {
    // A form in analogy (Action)
    type: 'CREATE_POLICY',
    payload: {
      name: name,
      amount: amount,
    },
  };
};

const createClaim = (name, claim_amount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name: name,
      claim_amount: claim_amount,
    },
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name: name,
    },
  };
};
