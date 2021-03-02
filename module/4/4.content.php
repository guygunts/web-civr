<section class="content" id="content-viewlist">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="box-tools pull-right">
                        <?php if (isset($permiss)) {
                            if ($permiss[1]) { ?>
                                <button type="button" class="btn btn-primary btn-flat btn-sm" onclick="me.New();"
                                        title="<?php echo $permiss[1]['name']; ?>">
                                    <i class="fa fa-plus"></i> <?php echo $permiss[1]['name']; ?>
                                </button>
                            <?php }
                        } ?>
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

<div class="modal fade " id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">List Data</h4>
      </div>
      <div class="modal-body"> 		  
        <table id="example" class="table table-striped table-hover responsive" style="width: 100%">
      </table>
<button  class="btn btn-default"  id="delete"  onclick="me.deltedata()" >Delete</button>
      </div>
    </div>
  </div>
</div> 

 <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModal" data-backdrop="static">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModal"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="frm_addedit_variation" name="frm_addedit_variation"  method="post" onsubmit="return false;">
		<div class="form-group">
            <label for="concept_result" class="col-form-label">Concept Result:</label>
            <input type="text" class="form-control" id="concept_result" name="concept_result" required="required">
          </div>
		  
		    <div class="form-group">
            <label for="variation_text" class="col-form-label">variation text:</label>
            <input type="text" class="form-control" id="variation_text" name="variation_text" required="required">
          </div>		    
        
      </div><input type="hidden" id="concept_variation_id" name="concept_variation_id">
	  <input type="hidden" id="concept_id" name="concept_id">
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" >submit</button>
      </div>
	  </form>
    </div>
  </div>
</div> 