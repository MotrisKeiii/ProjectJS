import { data } from 'autoprefixer';

export const validateRegister = ({
  username,
  fullname,
  email,
  pass,
  confirm_password,
}) => {
  const errors = {};
  if (!username) {
    errors.username = 'Vui lòng nhập tên đăng nhập';
  }
  if (!fullname) {
    errors.fullname = 'Vui lòng nhập họ ten';
  }
  if (!email) {
    errors.email = 'Vui lòng nhập email';
  }
  if (!pass) {
    errors.pass = 'Vui lòng nhập mật khẩu';
  } else if (pass.length < 6) {
    errors.pass = 'Mật khẩu phải >= 6 ký tự';
  }
  if (!confirm_password) {
    errors.confirm_password = 'Vui lòng nhập lại mật khẩu';
  } else if (pass !== confirm_password) {
    errors.confirm_password = 'Mật khẩu không khớp';
  }
  return errors;
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const validateLogin = ({ username, pass }) => {
  const errors = {};
  if (!username) {
    errors.username = 'Vui lòng nhập tên đăng nhập';
  }
  if (!pass) {
    errors.pass = 'Vui lòng nhập mật khẩu';
  } else if (pass.length < 6) {
    errors.pass = 'Mật khẩu phải >= 6 ký tự';
  }
  return errors;
};

export const validateProduct = (data) => {
  const errors = {};

  // Product
  if (!data.product_name || data.product_name.trim() === "") {
    errors.product_name = "Vui lòng nhập tên sản phẩm";
  } else if (data.product_name.length > 100) {
    errors.product_name = "Tên sản phẩm tối đa 100 ký tự";
  }

  // Alias
  if (!data.alias || data.alias.trim() === "") {
    errors.alias = "Vui lòng nhập alias";
  } else if (!/^[a-z0-9-]+$/.test(data.alias)) {
    errors.alias = "Alias chỉ chứa chữ thường, số và dấu gạch ngang";
  } else if (data.alias.length > 100) {
    errors.alias = "Alias tối đa 100 ký tự";
  }

  // cate_id
  if (!Number.isInteger(Number(data.cate_id)) || Number(data.cate_id) <= 0) {
    errors.cate_id = "Danh mục không hợp lệ";
  }

  // brand_id
  if (!Number.isInteger(Number(data.brand_id)) || Number(data.brand_id) <= 0) {
    errors.brand_id = "Thương hiệu không hợp lệ";
  }

  // detail
  if (data.detail && typeof data.detail !== "string") {
    errors.detail = "Mô tả chi tiết không hợp lệ";
  }

  // price
  if (data.price === undefined || data.price === null || data.price === "") {
    errors.price = "Vui lòng nhập giá";
  } else if (isNaN(data.price) || Number(data.price) < 0) {
    errors.price = "Giá phải lớn hơn hoặc bằng 0";
  }

  // sale_price
  if (
    data.sale_price !== undefined &&
    data.sale_price !== null &&
    data.sale_price !== ""
  ) {
    if (isNaN(data.sale_price) || Number(data.sale_price) < 0) {
      errors.sale_price = "Giá khuyến mãi không hợp lệ";
    } else if (Number(data.sale_price) > Number(data.price)) {
      errors.sale_price = "Giá khuyến mãi phải nhỏ hơn hoặc bằng giá";
    }
  }

  // trash
  if (data.trash !== undefined && ![0, 1].includes(Number(data.trash))) {
    errors.trash = "Trash chỉ nhận giá trị 0 hoặc 1";
  }

  // status
  if (![0, 1].includes(Number(data.status))) {
    errors.status = "Trạng thái không hợp lệ";
  }

  // launch_date
  if (!data.launch_date) {
    errors.launch_date = "Vui lòng nhập ngày ra mắt";
  } else if (isNaN(Date.parse(data.launch_date))) {
    errors.launch_date = "Ngày ra mắt không hợp lệ";
  }

  // tag
  if(!data.tag || data.tag.trim() === "") {
    errors.tag = "Vui long nhap tag";
  } else if (data.tag.length > 255) {
    errors.tag = "Tag toi da 255 ki tu"
  }

  // view
  if (data.view !== undefined) {
    if (!Number.isInteger(Number(data.view)) || Number(data.view) < 0) {
      errors.view = "View phải là số nguyên lớn hơn hoặc bằng 0";
    }
  }

  // summary
  if (data.summary && data.summary.length > 100) {
    errors.summary = "Mô tả ngắn tối đa 100 ký tự";
  }

  return errors;
};
