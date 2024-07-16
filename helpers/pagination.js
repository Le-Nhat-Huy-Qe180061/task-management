
module.exports = (objectPagination, query, countRecords) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }

    if (query.limit) {
        objectPagination.limitItems = parseInt(query.limit); // Nếu sau này truyền vào thì lấy theo cái truyền ko thì theo mặc định
    }


    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;


    const totalPage = Math.ceil(countRecords / objectPagination.limitItems);
    // console.log(totalPage);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}