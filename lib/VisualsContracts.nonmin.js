var powerbi;

!function(powerbi) {
    !function(VisualDataRoleKind) {
        VisualDataRoleKind[VisualDataRoleKind.Grouping = 0] = "Grouping", VisualDataRoleKind[VisualDataRoleKind.Measure = 1] = "Measure", 
        VisualDataRoleKind[VisualDataRoleKind.GroupingOrMeasure = 2] = "GroupingOrMeasure";
    }(powerbi.VisualDataRoleKind || (powerbi.VisualDataRoleKind = {}));
    powerbi.VisualDataRoleKind;
    !function(VisualDataChangeOperationKind) {
        VisualDataChangeOperationKind[VisualDataChangeOperationKind.Create = 0] = "Create", 
        VisualDataChangeOperationKind[VisualDataChangeOperationKind.Append = 1] = "Append";
    }(powerbi.VisualDataChangeOperationKind || (powerbi.VisualDataChangeOperationKind = {}));
    powerbi.VisualDataChangeOperationKind;
}(powerbi || (powerbi = {}));