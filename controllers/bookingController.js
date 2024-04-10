const Booking = require('../models/bookingModel')
const bookingController = {
    getListBooking: async (req, res) => {
        try {
            const { keyword } = req.body;
            let query = {};
            if (keyword) {
                query = {
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                    ]
                };
            }
            const listData = await Booking.find(query);
            res.json(listData);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createBooking: async (req, res) => {
        try {
            const { userid, patientId, appointmentId, time, bloodPressure, temperature, respiratoryRate, height, weight, left_eye_power, right_eye_power, systolic_bp, diastolic_bp, diagnosis, result, status } = req.body;

            // Kiểm tra xem đã tồn tại booking với userid và appointmentId đã cung cấp không
            const existingBooking = await Booking.findOne({ userid, appointmentId });
            if (existingBooking) {
                // Nếu booking đã tồn tại, trả về lỗi
                return res.status(400).json({ error: 'Booking already exists for this user and appointment' });
            }

            // Tạo mới một đối tượng Booking
            const newBooking = new Booking({ user_id, patientId, appointmentId, time, bloodPressure, temperature, respiratoryRate, height, weight, left_eye_power, right_eye_power, systolic_bp, diastolic_bp, diagnosis, result, status });

            // Lưu booking vào cơ sở dữ liệu
            const savedBooking = await newBooking.save();

            // Trả về dữ liệu đã lưu
            res.status(201).json(savedBooking);
        } catch (err) {
            // Xử lý lỗi nếu có
            res.status(500).json({ message: err.message });
        }
    },
    updateBooking: async (req, res) => {
        try {
            const { appointmentId } = req.params;
            const {
                user_id,
                patientId,
                time,
                bloodPressure,
                temperature,
                respiratoryRate,
                height,
                weight,
                left_eye_power,
                right_eye_power,
                systolic_bp,
                diastolic_bp,
                diagnosis,
                result,
                status
            } = req.body;

            // Kiểm tra xem booking có tồn tại không
            const existingBooking = await Booking.findOne({ appointmentId });
            if (!existingBooking) {
                return res.status(404).json({ error: 'Booking not found' });
            }

            // Cập nhật thông tin booking
            existingBooking.user_id = user_id;
            existingBooking.patientId = patientId;
            existingBooking.time = time;
            existingBooking.bloodPressure = bloodPressure;
            existingBooking.temperature = temperature;
            existingBooking.respiratoryRate = respiratoryRate;
            existingBooking.height = height;
            existingBooking.weight = weight;
            existingBooking.left_eye_power = left_eye_power;
            existingBooking.right_eye_power = right_eye_power;
            existingBooking.systolic_bp = systolic_bp;
            existingBooking.diastolic_bp = diastolic_bp;
            existingBooking.diagnosis = diagnosis;
            existingBooking.result = result;
            existingBooking.status = status;

            // Lưu thông tin cập nhật
            const updatedBooking = await existingBooking.save();

            // Trả về thông tin booking đã cập nhật
            res.status(200).json(updatedBooking);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    deleteBooking: async (req, res) => {
        try {
            const { _id } = req.body;
            // Kiểm tra xem Booking tồn tại không
            const existingBooking = await Booking.findById(_id);
            if (!existingBooking) {
                // Nếu Booking không tồn tại, trả về lỗi
                return res.status(404).json({ error: 'Booking not found' });
            }

            // Nếu Booking tồn tại, tiến hành xóa
            await Booking.findByIdAndDelete(_id);
            // Trả về thông báo thành công
            return res.status(200).json({ message: 'Booking deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}
module.exports = bookingController;