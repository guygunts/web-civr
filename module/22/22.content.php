<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
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
        <form id="frm_addedit" name="frm_addedit" method="post" onsubmit="return false;">
						<div class="form-group col-xs-3">
						<label>Version Build</label>
                              <select class="form-control select2" id="grammarversion" required="required"></select>
                            </div>
						<div class="form-group col-xs-3">
						<label>Grammar</label>
                              <select class="form-control select2" id="grammarNameadd" name="grammarNameadd" onchange="me.changedataadd()"  ></select>
                            </div>
						<div class="form-group col-xs-3">
						<label>Intent</label>
                              <select class="form-control select2" id="intentNameadd" name="intentNameadd" onchange="me.changedata1add()" ></select>
							  
                            </div>
							<div class="form-group col-xs-3">
						<label>Select Total</label> 
						<div class="form-group">
							  <button type="button" class="btn btn-primary btn-sm" id="selecttotal" onclick="totalresult()">0</button>
							   </div>
                            </div>
                           <!-- <div class="form-group col-xs-2">
                                <select class="form-control searchdata" name="page_sizeadd" id="page_sizeadd" >
									<option value="5" selected>5 / Page</option>
                                    <option value="10" >10 / Page</option>   
                                </select>
                            </div>  										
                           <button type="submit" class="btn btn-default col-xs-2" id="btnaddsubmit">Search</button> -->    
                   
               
				<div class="box-body"><input type="hidden" value="5" name="page_sizeadd" id="page_sizeadd">

                    <table id="tbView1" class="table table-bordered table-striped dataTable" style="width: 100%"></table>	
					<button  class="btn btn-default"  id="test"  onclick="me.adddata(0)" >test</button>
					<button  class="btn btn-default"  id="alltest" onclick="me.adddata(1)" >all test</button>					
                </div>
        
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
        <h4 class="modal-title" id="myModalLabel">select</h4>
      </div>
      <div class="modal-body">
        <table id="exampleModal1" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
	  <button  class="btn btn-default" id="deletedata" onclick="deletetableselect()">Delete</button>
	  <button  class="btn btn-default" id="testdata" onclick="testselect()">test</button>
      </div>
    </div>
  </div>
</div> 