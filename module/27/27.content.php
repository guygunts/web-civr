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
          <div class="col-8 col-sm-4">
            <label  >Start Date:</label>
          </div>
          <div class="col-4 col-sm-8">
	
									<input type="text" class="form-control datetimepicker-input" id="START_DATE" data-toggle="datetimepicker" data-target="#START_DATE"/>
</div> 
          </div>
        </div>
      </div>

	
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >End Date:</label>
          </div>
          <div class="col-4 col-sm-8">
								
								<input type="text" class="form-control datetimepicker-input" id="END_DATE" data-toggle="datetimepicker" data-target="#END_DATE" />
          </div>
        </div>
      </div>
      </div>



<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Mobile Type:</label>
          </div>
          <div class="col-4 col-sm-8">
		<select name="Mobile_Type" id="Mobile_Type" >
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
          <div class="col-8 col-sm-4">
            <label  >Type Group Day:</label>
          </div>
          <div class="col-4 col-sm-8">
            
		<input id="Type_Group_Day" type="text" name="Type_Group_Day"  oninput="this.value=this.value.replace(/[^0-9]/g,'');" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>
	  
	  <div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >History PackageName:</label>
          </div>
          <div class="col-4 col-sm-8">
            
		<input id="History_Package_Name" type="text" name="History_Package_Name" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>
	  
		
		<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label>History PackageCode:</label>
          </div>
          <div class="col-4 col-sm-8">
            
		<input id="History_Package_Code" type="text" name="History_Package_Code"   class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>
	  

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell PackageGroup :</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Package_Group" type="text" name="Upsell_Package_Group" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>
	  
	  
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell PackageName :</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Package_Name" type="text" name="Upsell_Package_Name" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell PackageCode:</label>
          </div>
          <div class="col-4 col-sm-8">
	<input id="Upsell_Package_Code" type="text" name="Upsell_Package_Code" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell GroupCode:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Group_Code" type="text"  name="Upsell_Group_Code" class="col-4 col-sm-8">
          </div>
        </div>
      </div>
      </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label>Upsell PackageSub Code:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Package_Sub_Code" type="text" name="Upsell_Package_Sub_Code" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
      </div>
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell FileName:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_File_Name" type="text" name="Upsell_File_Name" class="col-4 col-sm-8"/>.WAV
          </div>
        </div>
      </div>
      </div>
	  
<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell fileinfo:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_file_info" type="text"  name="Upsell_file_info" class="col-4 col-sm-8"/>.WAV
          </div>
        </div>
      </div>
  </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >productId:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="productId" type="text"  name="productId" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
  </div>
  
  <div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >productSequenceId:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="productSequenceId" type="text"  name="productSequenceId" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
  </div>
  
  <div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell_Package_Day:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Package_Day" type="text"  name="Upsell_Package_Day" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
  </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell_price:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_price" type="text"  name="Upsell_price" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
  </div>

<div class="row">
		<div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Upsell_Package_Type:</label>
          </div>
          <div class="col-4 col-sm-8">
            <input id="Upsell_Package_Type" type="text"  name="Upsell_Package_Type" class="col-4 col-sm-8"/>
          </div>
        </div>
      </div>
  </div>
  
	<div class="row">
		<div class="col-sm-12" >
        <div class="row">
          <div class="col-8 col-sm-4">
            <label  >Enable:</label>
          </div>
          <div class="col-4 col-sm-8">			
						<select  id="Enable">
			<option value="1">Enable</option>
			<option value="0">Disable</option>
			</select>
          </div>
        </div>
      </div>
 </div>
	
 <input id="upsell_id" type="hidden" name="upsell_id" >
        </form>
      </div>
	  
  

	
       <div class="modal-footer">
	   <button type="button" class="btn btn-danger" onclick="deletedata()" style="float: left;" id="delete">delete</button>
		<button  type="submit" class="btn btn-primary" onclick="me.add()">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
	 </div>
</form>
    </div>
  </div>
    </div>
</div>



