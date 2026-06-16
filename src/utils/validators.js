export const validateRegister = ({
  username,
  fullname,
  email,
  pass,
  confirm_password,
}) => {
  const errors = {}
  if (!username) {
    errors.username = 'Vui lòng nhập tên đăng nhập'
  }
  if (!fullname) {
    errors.fullname = 'Vui lòng nhập họ ten'
  }
  if (!email) {
    errors.email = 'Vui lòng nhập email'
  }
  if (!pass) {
    errors.pass = 'Vui lòng nhập mật khẩu'
  } else if (pass.length < 6) {
    errors.pass = 'Mật khẩu phải >= 6 ký tự'
  }
  if (!confirm_password) {
    errors.confirm_password = 'Vui lòng nhập lại mật khẩu'
  } else if (pass !== confirm_password) {
    errors.confirm_password = 'Mật khẩu không khớp'
  }
  return errors
}

export function isEmpty(obj) {
  return Object.keys(obj).length !== 0
}
