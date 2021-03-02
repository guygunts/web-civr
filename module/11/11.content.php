<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools" style="float: none !important;text-align: right">
										<div class="box-tools pull-left">
                        <?php if ($permiss[1]) { ?>
                            <button type="button" class="btn btn-primary btn-flat btn-sm" onclick="me.New();"
                                    title="<?php echo $permiss[1]['name']; ?>">
                                <i class="fa fa-plus"></i> <?php echo $permiss[1]['name']; ?>
                            </button>
                        <?php } ?>
                    </div>
                        <form id="frmsearch" class="form-inline" method="post" onsubmit="return false;">

                            <div class="form-group">
                                <select class="form-control searchdata" name="page_size" id="page_size">
                                    <option value="25" selected>25 / Page</option>
                                    <option value="50">50 / Page</option>
                                    <option value="75">75 / Page</option>
                                    <option value="100">100 / Page</option>
									<option value="500">500 / Page</option>
                                </select>
                            </div> 
						<div class="form-group">
                    <select id="service_id_drop" name="service_id_drop" class="select form-control" ></select>
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
						 <button  class="btn btn-default" id="deletedata" >Delete</button>
                </div>
                <!-- /.box-body -->

            </div>
            <!-- /.box -->
        </div>
    </div>
</section>