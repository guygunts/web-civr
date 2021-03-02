<form id="frm_addedit" method="post" onsubmit="return false;">
    <button type="submit" style="display: none" id="btnsubmit"></button>
    <input type="hidden" name="grammar_id" id="grammar_id">
    <input type="hidden" name="project_id" id="project_id">
    <input type="hidden" name="menu_action" id="menu_action">
    <div class="box box-danger">
        <div class="box-body">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="grammar_name" class="control-label">Grammar Name</label>
                    <input id="grammar_name" name="grammar_name" type="text" required="required" maxlength="100"
                           class="form-control project_name">
                </div>
            </div>

        </div>
    </div>

</form>