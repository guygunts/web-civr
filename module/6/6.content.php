<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
					
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">	
						
				<div class="form-group">
                              <button type="button" onclick="me.configadd()" class="btn btn-primary" id="add">Add</button>
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
	
	<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
                        <form id="frmsearch_input" class="form-inline" method="post" onsubmit="return false;">	
				<div class="form-group">
                              <button type="button" onclick="me.configaddinput()" class="btn btn-primary" id="add">Add</button>
                            </div>

                            <div class="form-group ">
                                <select class="form-control searchdata" name="page_size_input" id="page_size_input" onchange="me.changedatainput()">
									<option value="10" selected>10 / Page</option>
                                    <option value="40" >40 / Page</option>
                                    <option value="55">55 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
				    <option value="200">200 / Page</option>
			            <option value="300">300 / Page</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">

                    <table id="tbView_input" class="table table-bordered table-striped dataTable" style="width: 100%"></table>

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
        <form id="frmadd"  class="form-inline" method="post" onsubmit="return false;">
		
		<div class="form-group">
            <label for="item" class="col-form-label">conf_name:</label>
            <input type="text" class="form-control" id="conf_name" name="conf_name">
          </div>
		    <div class="form-group">
            <label for="Page" class="col-form-label">conf_value:</label>
            <input type="number" class="form-control" id="conf_value" name="conf_value">
          </div>		    
		  
	   	  		  
      </div><input type="hidden" id="conf_id" name="conf_id">
	  </form>
      <div class="modal-footer">
		<button type="button" class="btn btn-danger" onclick="me.deleteconfig()" style="float: left;" id="delete">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.configEdit()">submit</button>	
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal_input" tabindex="-1" role="dialog" aria-labelledby="exampleModal_input" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" ></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="frmadd_input"  class="form-inline" method="post" onsubmit="return false;">
		
		<div class="form-group">
            <label for="item" class="col-form-label">conf_name:</label>
            <input type="text" class="form-control" id="conf_input_name" name="conf_input_name">
          </div>
		    <div class="form-group">
            <label for="Page" class="col-form-label">conf_value:</label>
            <input type="number" class="form-control" id="conf_input_value" name="conf_input_value">
          </div>		    
		  
	   	  		  
      </div><input type="hidden" id="conf_input_id" name="conf_input_id">
	  </form>
      <div class="modal-footer">
		<button type="button" class="btn btn-danger" onclick="me.deleteconfiginput()" style="float: left;" id="delete_input">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.configEditinput()">submit</button>	
      </div>
    </div>
  </div>
</div>

