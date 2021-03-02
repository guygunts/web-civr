<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">
				<div class="form-group">
                               <button type="button" onclick="me.reset()" class="btn btn-primary" data-toggle="modal" data-target="#Modal">
				 Add
				</button>
                            </div>

                         <!--   <div class="form-group">
                                <select class="form-control searchdata" name="packid" id="packid">
                                    <option value="" selected>== packid ==</option>
                                </select>
                            </div> -->
							<div class="form-group">
                                <select class="form-control searchdata" name="enable" id="enable" onchange="changedata()">
                                    <option value="" selected>== Enable ==</option>
									<option value="1" selected>Y</option>
                                    <option value="0">N</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control searchdata" name="group" id="Package_group" onchange="changedata()">
                                    <option value="" selected>== Package group ==</option>
                                </select>
                            </div>

                            <!-- <div class="form-group col-sm-4">
                                <select class="form-control searchdata" name="compare" id="compare">
                                    <option value="day" selected>Compare : Day</option>
                                    <option value="hour">Compare : Hour</option>
                                </select>
                            </div> -->
                            <div class="form-group ">
                                <select class="form-control searchdata" name="page_size" id="page_size" onchange="changedata()">
                                    <option value="25" selected>25 / Page</option>
                                    <option value="50">50 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
				    <option value="200">200 / Page</option>
			            <option value="300">300 / Page</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input class="form-control searchdata" type="text" id="text_search" name="text_search" placeholder="KeyWord">
                            </div>
                            <button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button>

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


<div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form id="frmlist" class="form-inline" onsubmit="return false;" method="post"  >
	<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Start Date:</label>
          </div>
          <div class="col-4 col-sm-8">
	
									<input type="text" class="form-control datetimepicker-input" id="START_DATE" data-toggle="datetimepicker" data-target="#START_DATE" class="col-4 col-sm-10"/>
</div> 
          </div>
        </div>
      </div>

	
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >End Date:</label>
          </div>
          <div class="col-4 col-sm-8">
								
								<input type="text" class="form-control datetimepicker-input" id="END_DATE" data-toggle="datetimepicker" data-target="#END_DATE" class="col-4 col-sm-10"/>
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Package Type:</label>
          </div>
          <div class="col-4 col-sm-8">
		<input id="PACKAGE_TYPE" type="text" name="PACKAGE_TYPE" class="col-4 col-sm-10">
          </div>
        </div>
      </div>
      </div>
	  
	<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Group:</label>
          </div>
          <div class="col-4 col-sm-8">
	<select class="form-control searchdata" name="Group" id="GROUP" class="col-4 col-sm-10">                    
            </select>
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Package group:</label>
          </div>
          <div class="col-4 col-sm-8">
		<select class="form-control searchdata" name="PACKAGEGROUP" id="PACKAGEGROUP" class="col-4 col-sm-10">                    
            </select>
          </div>
        </div>
        </div>
        </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Mobile Type:</label>
          </div>
          <div class="col-4 col-sm-8">
		<select name="MOBILE_TYPE" id="MOBILE_TYPE" class="col-4 col-sm-10">
  		<option value="Post-paid">Post-paid</option>
  		<option value="Pre-paid">Pre-paid</option>
		</select>
          </div>
        </div>
      </div>
	</div>
		
		
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Price:</label>
          </div>
          <div class="col-4 col-sm-8">
            
		<input id="PRICE" type="text" name="PRICE"  oninput="this.value=this.value.replace(/[^0-9]/g,'');" class="col-4 col-sm-10">
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Package Name:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="PACKAGE_NAME" type="text" name="PACKAGE_NAME" class="col-4 col-sm-10">
          </div>
        </div>
      </div>
      </div>
	  
	  
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Package Code:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="PACKAGE_CODE" type="text" name="PACKAGE_CODE" class="col-4 col-sm-10">
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Speed:</label>
          </div>
          <div class="col-4 col-sm-8">
	<select class="form-control searchdata" name="SPEED" id="SPEED" class="col-4 col-sm-10">                    
            </select>
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Data Pack:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="DATA_GB" type="text" class="col-4 col-sm-6" name="DATA_GB" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
		<select id="type_size" name="type_size" onchange ="changetype()">
                            <option value="KB">KB</option>
                            <option value="MB">MB</option>
                            <option value="GB">GB</option>
			    <option value="Unlimit">Unlimit</option>
                        </select>
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Voice(Min):</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="VOICE_MIN" type="text" name="VOICE_MIN" oninput="this.value=this.value.replace(/[^0-9]/g,'');" class="col-4 col-sm-10"/>
          </div>
        </div>
      </div>
      </div>
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >File Name:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="FILE_NAME" type="text" name="FILE_NAME" class="col-4 col-sm-10"/>.WAV
          </div>
        </div>
      </div>
      </div>
	  
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >File Info:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="FILE_INFO" type="text"  name="FILE_INFO" class="col-4 col-sm-10"/>.WAV
          </div>
        </div>
      </div>
  </div>
  
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Name Script:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="NAME_SCRIPT" type="text" name="NAME_SCRIPT" class="col-4 col-sm-10">
          </div>
        </div>
      </div>
	</div>
	
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Info script:</label>
          </div>
          <div class="col-4 col-sm-8">
			<textarea id="INFO_SCRIPT" name="INFO_SCRIPT" rows="4" cols="30" class="col-4 col-sm-10"></textarea>
          </div>
        </div>
      </div>
	</div>
	<div class="row">
		<div class="col-sm-12" >
        <div class="row">
          <div class="col-8 col-sm-3">
            <label  >Enable:</label>
          </div>
          <div class="col-4 col-sm-8">			
						<select  id="ENABLE">
			<option value="1">Enable</option>
			<option value="0">Disable</option>
			</select>
          </div>
        </div>
      </div>
 </div>
 <input id="PACK_ID" type="hidden" name="PACK_ID" >
        </form>
      </div>
	  
  

	
       <div class="modal-footer">
		<button  type="submit" class="btn btn-primary" onclick="me.add()">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	 </div>
</form>
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
            <label for="configfilename" class="col-form-label">XML FileName:</label>
            <input type="text" class="form-control" id="filename">
          </div>		    
		  <div class="form-group">
            <label for="dumppath" class="col-form-label">XML path:</label>
            <input type="text" class="form-control" id="path">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.genxml()">submit</button>
      </div>
    </div>
  </div>
</div> 

