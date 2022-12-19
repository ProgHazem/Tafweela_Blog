class BaseResource {
  public pluck(rows, key, value) {
    let output: any = {}
    output.data = {}
    let records = rows.toJSON()
    for (let i = 0; i < records.length; i++) {
      output.data[records[i][key]] = records[i][value]
    }
    return output
  }

  public pluckValues(rows, value) {
    let output: any = {}
    output.data = []
    let records = rows.toJSON()
    for (let i = 0; i < records.length; i++) {
      output.data.push(records[i][value])
    }
    return output
  }

  // paginate(rows) {
  //   let output = {}
  //   output.data = []
  //   let records = rows.toJSON()
  //   for (let i = 0; i < records.length; i++) {
  //     output['data'].push(this.resource(records[i]))
  //   }
  //   output.current_page = rows.pagination.page
  //   output.per_page = rows.pagination.pageSize
  //   output.page_total = rows.toJSON().length
  //   output.last_page = rows.pagination.pageCount
  //   output.from = (output.current_page - 1) * output.per_page + 1
  //   output.to = output.from + output.page_total - 1
  //   output.total = rows.pagination.rowCount
  //   return output
  // }
}

export default BaseResource
