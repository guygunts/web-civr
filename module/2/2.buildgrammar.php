<div class="loading-container loading-inactive">
    <div class="loading-progress">
        <img class="img" src="images/loading.svg">
    </div>
</div>
<form id="frm_buildgrammar" method="post" onsubmit="return false;">
    <button type="submit" style="display: none" id="btnsubmitgrammar"></button>
    <input type="hidden" name="project_id" id="project_id">
    <input type="hidden" name="file_name" id="file_name">
    <div class="box box-danger">
        <div class="box-body">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="build_desc" class="control-label">Description</label>
                    <input id="build_desc" name="build_desc" type="text" required="required" maxlength="100"
                           class="form-control">
                </div>
            </div>
        </div>
    </div>

</form>