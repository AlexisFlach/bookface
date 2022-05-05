import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export const encryptPassword = async (password: string) => {
  let newPassword: string = '';
  await bcrypt.hash(password, saltRounds).then(function (hash: any) {
    newPassword = hash;
  });
  return newPassword;
};
