const Account = require('../models/accountModel');

const accountController = {

  signupAccount: async (req, res) => {
    try {
      const { password, phone, role } = req.body;
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
      const existingUser = await Account.findOne({ phone });
      if (existingUser) {
        // Nếu email đã tồn tại, trả về lỗi và ngăn không cho tạo tài khoản mới
        return res.status(202).json({ error: 'Phone already exists' });
      }
      // Tạo mới tài khoản với thông tin được cung cấp
      var fullName = phone
      const newUser = new Account({ fullName, password, phone, role });
      // Lưu tài khoản mới vào cơ sở dữ liệu
      const savedUser = await newUser.save();
      // Trả về thông tin tài khoản vừa được tạo
      res.status(201).json(savedUser);
    } catch (err) {
      // Xử lý lỗi nếu có
      res.status(400).json({ message: err.message });
    }
  },
  getListAccount: async (req, res) => {
    try {
      const { keyword, role } = req.query;
      let query = {};
      if (keyword) {
        query = {
          $or: [
            { fullName: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
            { phoneNumber: { $regex: keyword, $options: 'i' } }
          ]
        };
      }
      // Sử dụng $and để kết hợp điều kiện tìm kiếm keyword và role (nếu có)
      if (role) {
        query.role = role;
      }
      const users = await Account.find(query);
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  loginAccount: async (req, res) => {
    try {
      const { phone, password } = req.body;
      const existingUser = await Account.findOne({ phone, password });
      if (existingUser) {
        // Nếu email đã tồn tại, trả về data
        return res.status(201).json(existingUser);
      }
      return res.status(202).json({ error: 'Phone or password wrong' });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateAccountInfo: async (req, res) => {
    try {
      const { id, email, avatar, fullName, address, province, district, ward, dateOfBirth, gender, phoneNumber, position, academicRank, degree, introduction, departmentId, branchId, username } = req.body;

      // Tìm kiếm tài khoản theo email và mật khẩu
      const existingUser = await Account.findById(id);
      if (existingUser) {
        // Cập nhật thông tin nếu tài khoản đã tồn tại
        existingUser.fullName = fullName;
        existingUser.address = address;
        existingUser.province = province;
        existingUser.district = district;
        existingUser.ward = ward;
        existingUser.dateOfBirth = dateOfBirth;
        existingUser.gender = gender;
        existingUser.phoneNumber = phoneNumber;
        existingUser.position = position;
        existingUser.academicRank = academicRank;
        existingUser.degree = degree;
        existingUser.introduction = introduction;
        existingUser.departmentId = departmentId;
        existingUser.branchId = branchId;
        existingUser.username = username;
        existingUser.avatar = avatar;
        // Lưu thay đổi
        await existingUser.save();

        // Trả về thông tin tài khoản đã cập nhật
        return res.status(200).json(existingUser);
      }

      // Trả về lỗi nếu tài khoản không tồn tại
      return res.status(404).json({ error: 'Account not found' });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = accountController;
