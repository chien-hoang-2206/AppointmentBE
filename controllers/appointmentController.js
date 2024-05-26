// const Appointment = require('../models/appointmentModel')

// const appointmentRoutes = {
//     getListAppointment: async (req, res) => {
//         try {
//             const { keyword } = req.body;
//             let query = {};
//             if (keyword) {
//                 query = {
//                     $or: [
//                         { name: { $regex: keyword, $options: 'i' } },
//                     ]
//                 };
//             }
//             const listData = await Appointment.find(query);
//             res.json(listData);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     },
//     createAppointment: async (req, res) => {
//         try {
//             const { name, description } = req.body;
//             const existingUser = await Appointment.findOne({ name });
//             if (existingUser) {
//                 // Nếu email đã tồn tại, trả về lỗi và ngăn không cho tạo tài khoản mới
//                 return res.status(202).json({ error: 'Name already exists' });
//             }
//             const newObject = new Appointment({ name, description });
//             const savedData = await newObject.save();
//             res.status(201).json(savedData);
//         } catch (err) {
//             res.status(400).json({ message: err.message });
//         }
//     },
//     updateAppointment: async (req, res) => {
//         try {
//             const { id, name, description } = req.body;
//             const existingObject = await Appointment.findById(id);
//             if (existingObject) {
//                 existingObject.name = name;
//                 existingObject.description = description;
//                 // Lưu thay đổi
//                 await existingObject.save();
//                 // Trả về thông tin đã cập nhật
//                 return res.status(200).json(existingObject);
//             }

//             // Trả về lỗi nếu không tồn tại
//             return res.status(404).json({ error: 'Appointment not found' });

//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     },
//     deleteAppointment: async (req, res) => {
//         try {
//             const { id } = req.body;
//             // Kiểm tra xem Appointment tồn tại không
//             const existingAppointment = await Appointment.findById(id);
//             if (!existingAppointment) {
//                 // Nếu Appointment không tồn tại, trả về lỗi
//                 return res.status(404).json({ error: 'Appointment not found' });
//             }

//             // Nếu Appointment tồn tại, tiến hành xóa
//             await Appointment.findByIdAndDelete(id) ;
//             // Trả về thông báo thành công
//             return res.status(200).json({ message: 'Appointment deleted successfully' });
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     },
// }
// module.exports = appointmentRoutes;