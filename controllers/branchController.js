const Account = require('../models/accountModel');
const Branch = require('../models/branchModel');
const Department = require('../models/departmentModel');
const branchController = {
    getListBranch: async (req, res) => {
        try {
            const { keyword, id } = req.query;
            let query = {};
            if (keyword) {
                query = {
                    $or: [
                        { name: { $regex: keyword, $options: 'i' } },
                        { address: { $regex: keyword, $options: 'i' } },
                    ]
                };
            }
            if (id) {
                const branches = await Branch.findById(id).lean();
                // Duyệt qua từng chi nhánh
                const departments = await Department.find({ branchId: id }).lean();
                // Lặp qua từng phòng ban và lấy danh sách doctorIds
                const doctorIds = departments.reduce((acc, dept) => acc.concat(dept.doctorIds || []), []);
                // Lấy thông tin của các tài khoản tương ứng với doctorIds
                const doctors = await Account.find({ _id: { $in: doctorIds } }).lean();
                // Gán danh sách các bác sĩ vào phòng ban tương ứng
                branches.departments = departments.map(dept => ({
                    ...dept,
                    doctors: doctors.filter(doc => dept?.doctorIds?.includes(doc._id.toString()))
                }));
                res.json(branches);
            }
            else {
                const branches = await Branch.find(query).lean();
                // Duyệt qua từng chi nhánh
                for (let branch of branches) {
                    const departments = await Department.find({ branchId: branch._id }).lean();
                    console.log("🚀 ~ getListBranch: ~ departments:", departments)
                    // Lặp qua từng phòng ban và lấy danh sách doctorIds
                    const doctorIds = departments.reduce((acc, dept) => acc.concat(dept.doctorIds || []), []);
                    // Lấy thông tin của các tài khoản tương ứng với doctorIds
                    const doctors = await Account.find({ _id: { $in: doctorIds } }).lean();
                    // Gán danh sách các bác sĩ vào phòng ban tương ứng
                    branch.departments = departments.map(dept => ({
                        ...dept,
                        doctors: doctors.filter(doc => dept.doctorIds.includes(doc._id.toString()))
                    }));
                }
                res.json(branches);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    createBranch: async (req, res) => {
        try {
            const { name, address, image } = req.body;
            const existingBranch = await Branch.findOne({ name });
            if (existingBranch) {
                // Nếu email đã tồn tại, trả về lỗi và ngăn không cho tạo tài khoản mới
                return res.status(202).json({ status: 201, message: 'Bệnh viện đã tồn tại' });

            }
            const newObject = new Branch({ name, address, image });
            const savedData = await newObject.save();
            res.status(200).json({ _id: savedData._id, status: 200 });
        } catch (err) {
            res.status(400).json({ status: 201, message: err.message });
        }
    },
    updateBranch: async (req, res) => {
        try {
            const { _id, name, address, departmentIds, doctorIds } = req.body;
            const existingObject = await Branch.findById(_id);
            if (existingObject) {
                existingObject.name = name;
                existingObject.address = address;
                existingObject.departmentIds = departmentIds;
                existingObject.doctorIds = doctorIds;
                // Lưu thay đổi
                await existingObject.save();

                // Trả về thông tin đã cập nhật
                return res.status(200).json(existingObject);
            }

            // Trả về lỗi nếu không tồn tại
            return res.status(404).json({ error: 'Branch not found' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteBranch: async (req, res) => {
        try {
            const { _id } = req.body;
            // Kiểm tra xem branch tồn tại không
            const existingBranch = await Branch.findById(_id);
            if (!existingBranch) {
                // Nếu branch không tồn tại, trả về lỗi
                return res.status(404).json({ error: 'Branch not found' });
            }

            // Nếu branch tồn tại, tiến hành xóa
            await Branch.findByIdAndDelete(_id);
            // Trả về thông báo thành công
            return res.status(200).json({ message: 'Branch deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}
module.exports = branchController;