<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">
						<!--<div class="form-group ">
                              <select class="form-control " id="fileName" onchange="me.changedata()"></select>
                            </div> -->
				<div class="form-group">
                              <button type="button" onclick="me.callflowadd()" class="btn btn-primary" id="add">Add Grammar</button>
                            </div>
                            <div class="form-group ">
                                <select class="form-control searchdata" name="page_size" id="page_size" onchange="me.changedata()">
                                    <option value="40" selected>40 / Page</option>
                                    <option value="55">55 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
				    <option value="200">200 / Page</option>
			            <option value="300">300 / Page</option>
                                </select>
                            </div>
                           <!-- <div class="form-group">
                                <input class="form-control searchdata" type="text" id="text_search" name="text_search" placeholder="KeyWord">
                            </div>
                            <button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button> -->

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
            <label for="grammarname" class="col-form-label">Grammar Name:</label>
            <input type="text" class="form-control" id="grammarname">
          </div>		    
		  <div class="form-group">
            <label for="grammardesc" class="col-form-label">Grammar Description:</label>
            <input type="text" class="form-control" id="grammardesc">
          </div>

		  		    <div class="form-group">
            <label for="server" class="col-form-label">Server:</label>
			<select class="form-control " id="server" ></select>
          </div>
        </form>
      </div><input type="hidden" id="grammar_id">
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.insertgrammar()">submit</button>	
      </div>
    </div>
  </div>
</div>


 <div class="modal fade" id="example1" tabindex="-1" role="dialog" aria-labelledby="example1" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="example1"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
		    <div class="form-group">
            <label for="description" class="col-form-label">description:</label>
            <input type="text" class="form-control" id="description">
          </div>		    
        </form>
      </div><input type="hidden" id="file_id">
      <div class="modal-footer">
	  <button type="button" class="btn btn-danger" onclick="me.deletegrammarfile()" style="float: left;">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.updategrammar()">submit</button>
      </div>
    </div>
  </div>
</div> 



<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">List File Grammar</h4>
      </div>
      <div class="modal-body"> 		  				
        <table id="example" class="table table-striped table-hover responsive" style="width: 100%">
      </table>

      </div>
    </div>
  </div>
</div> 

<div class="modal fade " id="uploadfile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-auto" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">upload file</h4>
      </div>
      <div class="modal-body">
<form id="frm_addedit" name="frm_addedit" enctype="multipart/form-data" method="post" onsubmit="return false;">	  
		<div class="row">		
<div class="col-sm-12">			
					 <div class="form-group">
	<div class="form-group col-xs-4">
                                <label  class="col-form-label">Grammar File Name</label>
                            </div>
	 <div class="custom-file form-group col-xs-6">
                        <input type="file" class="custom-file-input" id="file" name="file"  aria-describedby="myInput" multiple accept=".gram">
                            </div>
							</div> 
							  </div>
</div>
	   <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >submit</button>
      </div>
      </div>
</form>
    </div>
  </div>
 
</div> 

       


