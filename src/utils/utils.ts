export const firstNameRules = {
  required: {
    value: true,
    message: 'First Name is required.',
  },
  maxLength: {
    value: 25,
    message: 'First Name has a maximum of 25 characters',
  },
  minLength: {
    value: 3,
    message: 'First Name requires a minimum of 3 characters.',
  },
};

export const lastNameRules = {
  maxLength: {
    value: 30,
    message: 'If inputted, Last Name has a maximum of 30 characters',
  },
  minLength: {
    value: 2,
    message: 'If inputted, Last Name requires a minimum of 2 characters.',
  },
};

export const emailRules = {
  pattern: {
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    message: 'Invalid email address.',
  },
};
