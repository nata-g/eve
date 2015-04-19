Template.messageItem.helpers({
  submittedText: function() {
    return moment(this.submitted).calendar();
  }
});