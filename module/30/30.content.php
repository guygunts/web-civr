<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools" style="float: none !important;text-align: left">
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">
						
                            <div class="form-group ">
                                <div class="input-group date" id="start_date" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input searchdata"
                                           data-target="#start_date" name="start_date" placeholder="Start Date" required/>
                                    <span class="input-group-addon" data-target="#start_date"
                                          data-toggle="datetimepicker">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                </div>
                            </div>
                            <div class="form-group ">
                                <div class="input-group date" id="end_date" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input searchdata"
                                           data-target="#end_date" name="end_date" placeholder="End Date" required/>
                                    <span class="input-group-addon" data-target="#end_date"
                                          data-toggle="datetimepicker">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                                </div>
                            </div>

                            <div class="form-group">
                                <select class="form-control searchdata" name="page_size" id="page_size">
                                    <option value="25" selected>25 / Page</option>
                                    <option value="50">50 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
                                    <option value="500">500 / Page</option>
                                    <option value="1000">1000 / Page</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <select class="form-control searchdata select2" name="grammar" id="grammar" onchange="changedata()">
                                    <option value="" selected>== GRAMMAR ==</option>
                                </select>
                            </div>
							
							<div class="form-group ">
                                <select class="form-control searchdata select2" name="intent" id="intent" style="width: 200px;">
                                    <option value="" selected>== INTENT ==</option>
                                </select>
                            </div>
							
							   <div class="form-group">
                                <select class="form-control searchdata" name="flag_edit" id="flag_edit">
                                 <option value="" selected>== QC ==</option>
                                    <option value="1">Verified</option>
                                    <option value="0">New</option>
                                </select>
                            </div>
							
                            <div class="form-group">
                                <select class="form-control searchdata" name="qc_status" id="qc_status">
                                   <option value="" selected>== STATUS ==</option>
                                    <option value="P">Pass</option>
                                    <option value="F">Fail</option>
                                    <option value="G">Garbage</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>

                                                        <div class="form-group">
                                <select class="form-control searchdata " name="confiden" id="confiden">
                                    <option value="" selected>== INTENT CONFIDENT ==</option>
                                </select>
                            </div>
							<div class="form-group">
                                <select class="form-control searchdata " name="input_confiden" id="input_confiden">
                                    <option value="" selected>== INPUT CONFIDENT ==</option>
                                </select>
                            </div>
							
							
						
                            <div class="box-tools" style="float: none !important;text-align: left;margin-top: 20px">
                                <input class="form-control searchdata" type="text" id="text_search" name="text_search" placeholder="KeyWord">
								<button type="submit" class="btn btn-default" id="btnsearchsubmit">Search</button>
								<span  id="eyeview" class="glyphicon glyphicon-eye-open" style="font-size:24px"></span>
                            </div>
                            
						<div class="form-group">
						
						</div>
                        </form>
                    </div>

                    <div class="box-tools" style="float: none !important;text-align: center;margin-top: 20px">
                        <form id="frmsearchrandom" class="form-inline" method="post" onsubmit="return false;">

                            <button type="submit" class="btn btn-default" id="btnsearchrandomsubmit">RANDOM</button>
                            <div class="form-group">
                                <input class="form-control" type="text" id="random_num" name="random_num" placeholder="" value="" required>
                            </div>

                        </form>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">

                        <table id="tbView" class="table table-bordered table-striped dataTable" style="width: 100%"></table>


<!--                        <form id="frmresult" style="display: none;">-->
<!--                            <div class="form-group">-->
<!--                                <label for="result">Result</label>-->
<!--                                <input type="hidden" name="chnn" id="chnn"/>-->
<!--                                <textarea class="form-control" id="result"></textarea>-->
<!--                            </div>-->
<!--                            <button type="button" onclick="me.UpdateVoice();" class="btn btn-default" style="float: right;">Submit</button>-->
<!--                        </form>-->

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
            <label for="qc_statu" class="col-form-label">qc_status:</label>
            <select id="qc_statu" class="form-control"><option value="" selected>= Status =</option><option value="P" >Pass</option><option value="F" >Fail</option><option value="G" >Garbage</option><option value="O" >Other</option></select>
          </div>
          <div class="form-group">
            <label for="expec_intent" class="col-sm-9  col-form-label">expec_intent:</label>
             <select class="select2 form-control"  id="expec_intent" style="width: 100%">
                                    <option value="" selected>== INTENT ==</option>
                                </select>
          </div>
		            <div class="form-group">
            <label for="new_sentence" class="col-form-label">new_sentence:</label>
            <input type="text" class="form-control" id="new_sentence">
          </div>
		            <div class="form-group">
            <label for="remark" class="col-form-label">remark:</label>
            <input type="text" class="form-control" id="remark">
          </div>
		            <div class="form-group">
            <label for="action" class="col-form-label">action:</label>
            <select id="action"  class="form-control action1 row1 empty1 "><option value="0" >None</option><option value="1" >Train</option><option value="2" >Test</option><option value="3" >Test&Train</option></select>
          </div>
		  <input type="hidden" id="date_time">
		  <input type="hidden" id="code">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="me.UpdateVoice()">submit</button>
      </div>
    </div>
  </div>
</div>