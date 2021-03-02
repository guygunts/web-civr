<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools col-sm-8">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">
						<div class="form-group col-sm-4">
                              <select class="form-control  select2" id="grammarName" onchange="me.changedata()"></select>
                            </div>
						<div class="form-group col-sm-4">
                              <select class="form-control select2" id="intentName" onchange="me.changedata1()"></select>
                            </div>

                            <div class="form-group col-sm-4">
                                <select class="form-control searchdata" name="page_size" id="page_size" >
									<option value="10" selected>10 / Page</option>
                                    <option value="40" >40 / Page</option>
                                    <option value="55">55 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
				    <option value="200">200 / Page</option>
			            <option value="300">300 / Page</option>
                                </select>
								<button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button> 
                            </div>  

                        </form>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">

                    <table id="tbView" class="table table-bordered table-striped dataTable" style="width: 100%"></table>	
					<button  class="btn btn-default"  id="delete"  onclick="me.deletemutidata()" >delete</button>
					<button  class="btn btn-default"  id="move"  data-toggle="modal" data-target="#exampleModalmove">move</button>
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
        <form id="frm_addedit" name="contact-form" enctype="multipart/form-data" method="post"   onsubmit="return false;" >
				<div class="form-group">
				<label for="grammarNameadd" class="col-form-label">Grammar:</label>
                        <select class="form-control select2" id="grammarNameadd" name="grammarNameadd" required onchange="me.changedataadd()"></select>
                        </div>
				<div class="form-group ">
				<label for="intentNameadd" class="col-form-label">Intent:</label>
                        <select class="form-control select2" id="intentNameadd" name="intentNameadd" required></select>
                         </div>
						 <div class="form-group">
                    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#uploadvoice">Upload</button>
				<!--	<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Recordvoice">Record</button> -->
        <div id="uploadvoice" class="collapse">
           <div class="form-group">
                    <label for="file" class="control-label">Upload</label>
                    <input id="file" name="file" type="file" accept=".wav" class="form-control" multiple>
                </div>
			</div>
			<div id="Recordvoice" class="collapse">
           <div class="form-group">  
					<div class="row">
					<div class="col-sm-9">
					<label for="file" class="control-label">File Name</label>
					</div>
					</div>
					<div class="row">
					<div class="col-8 col-sm-6">
					<input type="text" class="form-group" id="filename">
					<button id="recButton" class="form-group record" onclick="recordvoice()"></button>
					<label id="lbltipAddedComment">0</label>
					</div>
                    </div>
                </div>
			</div>
                </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="submitBtn">submit</button>	
      </div>
	  </form>
    </div>
  </div>
</div>




<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">result upload voice</h4>
      </div>
      <div class="modal-body">
        <table id="example" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
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
            <label for="sentence" class="col-form-label">sentence:</label>
            <input type="text" class="form-control" id="sentence">
          </div>		    
		  <div class="form-group">
            <label for="concept" class="col-form-label">concept:</label>
			<select id="concept"  class="form-control select2" multiple ></select>
          </div>
		 
		  <div class="form-group">
            <label for="action" class="col-form-label">action:</label>
			<select id="action"  class="form-control action1 row1 empty1 " disabled><option value="0" >None</option><option value="1" >Train</option><option value="2" >Test</option><option value="3" >Test&Train</option></select>
          </div>
        </form>
      </div><input type="hidden" id="voice_id">
      <div class="modal-footer">
	  <button type="button" class="btn btn-danger" onclick="me.deleteuploadvoice()" style="float: left;" id="deleteuploadvoice">delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.edituploadvoice()">submit</button>
      </div>
    </div>
  </div>
</div>  


<div class="modal fade" id="exampleModalmove" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="frm_move" name="contact-form"  method="post"   onsubmit="return false;" >
				<div class="form-group">
				<label for="grammarNamemove" class="col-form-label">Grammar:</label>
				<span class="error">*</span>
                        <select class="form-control select2" id="grammarNamemove" name="grammarNamemove" required onchange="me.changedatamove()"></select>
                        </div>
				<div class="form-group ">
				<label for="intentNamemove" class="col-form-label">Intent:</label>
				<span class="error">*</span>
                        <select class="form-control select2" id="intentNamemove" name="intentNameamove" required></select>
                         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="submitBtn" >Move</button>	
      </div>
	  </form>
    </div>
  </div>
</div>