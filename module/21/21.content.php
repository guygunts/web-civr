<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
				<div class="box-tools pull-left">
				<label>Send to Test to :</label>
				 <button type="button" class="btn btn-primary btn-sm" id="selecttotal" onclick="totalresult()">0</button>				 
				</div>
                    <div class="box-tools pull-right">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">			
						<div class="form-group" style="width: 200px;">
                              <select class="form-control select2" id="grammarName" onchange="me.changedata()"></select>
                            </div>
						<div class="form-group " style="width: 200px;">
                              <select class="form-control select2" id="intentName" onchange="me.changedata1()"></select>
                            </div>

                            <div class="form-group ">
                                <select class="form-control searchdata" name="page_size" id="page_size" >
									<option value="10" selected>10 / Page</option>
                                    <option value="40" >40 / Page</option>
                                    <option value="55">55 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
									<option value="200">200 / Page</option>
									<option value="300">300 / Page</option>
                                </select>
                            </div>                         
                           <button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button> 

                        </form>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">

                    <table id="tbView" class="table table-bordered table-striped dataTable" style="width: 100%"></table>
<button  class="btn btn-default"  id="delete"  onclick="deletemutidata()" >delete</button>					
                </div>
                <!-- /.box-body -->
            </div>
            <!-- /.box -->
        </div>
    </div>   


    </section>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
						
						<div class="form-group">
						<label>Grammar</label>
                              <select class="form-control select2" id="grammarNameadd"  onchange="me.changedataadd()" name="grammarNameadd" ></select>
                            </div>
						<div class="form-group">
						<label>Intent</label>
                              <select class="form-control select2" id="intentNameadd"  name="intentNameadd"></select>
							  
                            </div>
							<div class="form-group">
						<label for="concept" class="col-form-label">concept:</label>
					<select id="concept"  name="concept" class="form-control select2" multiple ></select>
							</div>
							<div class="form-group">
						<label>Sentence</label> 
						<div class="form-group">
							  <input type="text" id="sentence" data-role="tagsinput" />
							   </div>
                            </div> 
							
							<div class="form-group" id="filediv" >
						<label>Upload File</label> 
						<div class="form-group">
							  <input type="file" class="custom-file-input" id="customFile" name="customFile" accept="text/plain, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
							   </div>
                            </div>                   
						<input type="hidden" name="test_sentence_id" id="test_sentence_id">
				
				<input type="hidden" value="5" name="page_sizeadd" id="page_sizeadd">
				
               
				 <div class="modal-footer">
	  <button type="button" class="btn btn-danger" onclick="deletedata()" style="float: left;" id="deletetest">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button   class="btn btn-default"  onclick="submitdata()">submit</button>
      </div>
        
      </div>

    </div>
  </div>
</div>

<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
	  <div class="form-group col-xs-4">
						<label>Version Build</label>
                              <select class="form-control select2" id="grammarversion" ></select>
                            </div>
        <table id="exampleModal1" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
	  <button  class="btn btn-default" id="deletedata" onclick="deletetableselect()">Delete</button>
	  <button  class="btn btn-default" id="testdata" onclick="testselect()">test</button>
	  <div class="modal-footer">
	  </div>
      </div>
    </div>
  </div>
</div> 


<div class="modal fade " id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Result</h4>
      </div>
      <div class="modal-body">
	  						<div class="form-group col-xs-3">
						<div class="input-group date" id="start_date" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input searchdata"
                                           data-target="#start_date" name="start_date" placeholder="Start Date" required/>
                                    <span class="input-group-addon" data-target="#start_date"
                                          data-toggle="datetimepicker">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                </div>
                            </div>
						<div class="form-group col-xs-3">
						<div class="input-group date" id="end_date" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input searchdata"
                                           data-target="#end_date" name="end_date" placeholder="End Date" required/>
                                    <span class="input-group-addon" data-target="#end_date"
                                          data-toggle="datetimepicker">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                </div>
                            </div>
						<div class="form-group col-xs-3">
						<select class="form-control searchdata" name="page_size1" id="page_size1" >
									<option value="5" selected>5 / Page</option>
                                    <option value="10" >10 / Page</option>
                                    <option value="15">15 / Page</option>

                                </select>
								 
                            </div>	
						<div class="form-group col-xs-3">	
						<button type="submit" class="btn btn-default" onclick="me.onsummitdata()">Search</button> 
						</div>
        <table id="exampleModal2" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
      </div>
    </div>
  </div>
</div> 
