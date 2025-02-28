const Task = require("../model/task.model");

// Phân trang
const paginationHelper = require("../../../helpers/pagination");

// Search
const searchHelper = require("../../../helpers/search");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    // console.log(req.query); // lấy ra yêu cầu trên url

    let find = {
       $or: [
        {createdBy: req.user.id},
        {listUser: req.user.id}
       ],
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    //--- sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue; // do key linh động do client truyền vào nên ta dùng dạng này
    }
    //--- End sort

    //--- Search
    const objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    //--- Phân trang
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
    };
    const countTasks = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    );
    //--- END Phân trang

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    res.json(tasks);
};

//[GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;

        const task = await Task.findOne({
            _id: id,
            deleted: false,
        });

        res.json(task);
    } catch (error) {
        res.json("Ko tìm thấy ");
    }
};

//[PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;

        const status = req.body.status;

        await Task.updateOne(
            {
                _id: id,
                deleted: false,
            },
            {
                status: status,
            }
        );

        console.log(req.body);

        res.json({
            code: 200,
            message: "cập nhập trạng thái thành công!",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!",
        });
    }
};

//[PATCH] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;

        console.log(ids);
        console.log(key);
        console.log(value);

        switch (key) {
            case "status":
                await Task.updateMany(
                    {
                        _id: { $in: ids },
                    },
                    {
                        status: value,
                    }
                );
                res.json({
                    code: 200,
                    message: "cập nhập trạng thái thành công!",
                });
                break;

            case "delete":
                await Task.updateMany(
                    {
                        _id: { $in: ids },
                    },
                    {
                        deleted: true,
                        deleteAt: new Date()
                    }
                );
                res.json({
                    code: 200,
                    message: "Xoá thành công!",
                });


            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại",
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!",
        });
    }
};

//[POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        const task = new Task(req.body);
        const data = await task.save();

        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data,
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi",
        });
    }
};

//[PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({ _id: id }, req.body);

        res.json({
            code: 200,
            message: "Chỉnh sửa thành công!",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Chỉnh sửa thất bại",
        });
    }
};

//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({ _id: id }, { deleted: true, deleteAt: new Date() });

        res.json({
            code: 200,
            message: "Xóa thành công",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!",
        });
    }
};

// B49 1h