<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">
						<div class="form-group ">
                              <select class="form-control " id="fileName" onchange="me.changedata()"></select>
                            </div>
				<div class="form-group">
                              <button type="button" onclick="me.configadd()" class="btn btn-primary" id="add">Add variable</button>
                            </div>

                            <div class="form-group ">
                                <select class="form-control searchdata" name="page_size" id="page_size" onchange="me.changedata()">
									<option value="10" selected>10 / Page</option>
                                    <option value="40" >40 / Page</option>
                                    <option value="55">55 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
				    <option value="200">200 / Page</option>
			            <option value="300">300 / Page</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input class="form-control searchdata" type="text" id="text_search" name="text_search" placeholder="KeyWord">
                            </div>
                          <!--  <button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button> -->

                        </form>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">

                    <table id="tbView" class="table table-bordered table-striped dataTable" style="width: 100%"></table>

                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->
        </div>
    </div>   


    </section>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
		    <div class="form-group">
            <label for="Page" class="col-form-label">Page:</label>
            <input type="text" class="form-control" id="Page">
          </div>		    
		  <div class="form-group">
            <label for="item" class="col-form-label">item:</label>
            <input type="text" class="form-control" id="item">
          </div>
		    <div class="form-group">
            <label for="value" class="col-form-label">value:</label>
            <input type="text" class="form-control inputNumberDot" id="value">
          </div>
		  		    <div class="form-group">
            <label for="valiablename" class="col-form-label">valiablename:</label>
            <input type="text" class="form-control" id="valiablename">
          </div>
        </form>
      </div><input type="hidden" id="config_no">
      <div class="modal-footer">
		<button type="button" class="btn btn-danger" onclick="me.deleteconfig()" style="float: left;" id="delete">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.configEdit()">submit</button>	
      </div>
    </div>
  </div>
</div>


 <div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel1"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
		    <div class="form-group">
            <label for="configfilename" class="col-form-label">configfilename:</label>
            <input type="text" class="form-control" id="configfilename">
          </div>		    
		  <div class="form-group">
            <label for="dumppath" class="col-form-label">dumppath:</label>
            <input type="text" class="form-control" id="dumppath">
          </div>
        </form>
      </div><input type="hidden" id="config_filename_no">
      <div class="modal-footer">
	  <button type="button" class="btn btn-danger" onclick="me.deletenamefile()" style="float: left;" id="deletenamefile">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.addnamefile()">submit</button>
      </div>
    </div>
  </div>
</div> 



<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Management Ini</h4>
      </div>
      <div class="modal-body">
        <table id="example" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
      </div>
    </div>
  </div>
</div> 

       


