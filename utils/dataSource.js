const dataSources = {
  fetchData: async (model, page, showPerPage, sort, options) => {
    try {
      const data = await model
        .find(options)
        .limit(showPerPage)
        .skip(showPerPage * (page - 1))
        .sort({ _id: sort === "desc" ? -1 : 1 })
        .select(" -__v")
        .lean();
      const totalCount = await model.countDocuments(options);
      const totalPages = Math.ceil(totalCount / showPerPage);
      return {
        data,
        currentPage: parseInt(page),
        totalPages,
        showPerPage: parseInt(showPerPage),
        totalCount,
      };
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = dataSources;
