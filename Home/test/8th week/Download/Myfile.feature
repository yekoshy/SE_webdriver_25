Feature: #PA-7492 Offer approval Workflow - Offer Approval

  Background: Login and Navigate to Offer Approval
    Given I am logged in to the application Approver
    And I am on the Home Dashboard page
    And each Offer is submitted by a recruiter from an approved requisition

  @ai-assisted
  Scenario: Verify approval task is created when offer is submitted
    Given a recruiter has submitted an offer for approval
    When I navigate to my workspace dashboard
    Then I should see an approval task in my task table
    And the task should be for the submitted offer
    And I should receive an in-app notification about the pending approval

  @ai-assisted
  Scenario: Verify approver can access offer in read-only mode
    Given I have an offer approval task in my workspace
    When I click on the approval task
    Then I should be redirected to the Approval tab
    And all offer fields and door should be displayed in read-only mode
    And I should not be able to edit any fields

  @ai-assisted
  Scenario: Verify offer approval tab displays all required information
    Given I am reviewing an offer in the approval tab
    Then I should see the requisition details
    And I should see the offer details including salary, equity, bonuses, and relocation
    And I should see current offer vs expected cost comparison
    And I should see last job compensation from Comp Discovery
    And I should see the uploaded offer letter preview if present

  @ai-assisted
  Scenario: Verify AI Summary section is displayed
    Given I am reviewing an offer
    Then I should see the AI Summary section
    And the summary should highlight potential risks
    And the summary should show inconsistencies if any
    And the summary should display candidate fit notes
    And the summary should be auto-generated from interview data

  @ai-assisted
  Scenario: Verify AI Audit Score is displayed
    Given I am reviewing an offer
    Then I should see the overall AI Audit Score in the header
    And the score should be calculated from interview scorecards
    And the score should consider completeness, right person, and robustness factors

  @ai-assisted
  Scenario: Verify AI Audit Score breakdown table
    Given I am reviewing an offer
    Then I should see the audit score breakdown table
    And each interview step should show "Completed by" information
    And each step should show completion status with checkmark or x
    And each step should show "Right Person" indicator
    And each step should show "Completeness" indicator
    And each step should show "Robustness" indicator

  @ai-assisted
  Scenario: Verify incomplete interview step displays x across row
    Given an interview step was not completed
    When I view the audit score breakdown
    Then the incomplete step should have "x" across the whole row
    And the step should be clearly marked as incomplete

  @ai-assisted
  Scenario: Verify Right Person analysis
    Given I am reviewing the audit score
    Then the "Right Person" column should indicate if correct interviewer level was used
    And it should show checkmark if interviewer matches intended role
    And it should show x if interviewer was wrong level or different role

  @ai-assisted
  Scenario: Verify Completeness analysis
    Given I am reviewing the audit score
    Then the "Completeness" column should indicate if all focus areas were covered
    And it should show checkmark if all required topics were addressed
    And it should show x if important areas are missing

  @ai-assisted
  Scenario: Verify Robustness analysis
    Given I am reviewing the audit score
    Then the "Robustness" column should indicate quality of feedback
    And it should evaluate length, substance, and relevance of notes
    And it should flag shallow or generic responses

  @ai-assisted
  Scenario: Verify scorecards section displays average scores
    Given I am reviewing an offer
    Then I should see the scorecards section
    And I should see average scores for each category
    And I should be able to hover over average scores to see individual scores
    And the tooltip should show detailed breakdown

  @ai-assisted @duplicate
  Scenario: Verify scorecard hover tooltip displays individual scores
    When I hover over the average values score
    Then I should see a tooltip with individual scores from each category
    And the tooltip should show detailed breakdown

  @ai-assisted 
  Scenario: Approve offer successfully
    Given I am reviewing an offer in the approval tab
    When I click the "Approve" button
    Then the offer should be marked as approved
    And the recruiter should receive an in-app notification
    And the notification should indicate the offer was approved
    And the offer should be submitted for Next Approver if available
    And the new approver should receive the task in their workspace
    And the old approver should retain view-only access for audit

  @ai-assisted
  Scenario: Reject offer with mandatory comments
    Given I am reviewing an offer in the approval tab
    When I click the "Reject" button
    Then a modal should open requiring me to enter comments
    And the modal should not allow submission without comments
    When I enter rejection comments and submit
    Then the recruiter should receive an in-app notification

  @ai-assisted
  Scenario: Request follow-up with structured feedback
    Given I am reviewing an offer in the approval tab
    When I click the "Request Follow-Up" button
    And I add structured feedback in the modal
    Then the recruiter should receive an in-app notification
    And the offer should be marked as requiring follow-up

  @ai-assisted @invaild
  Scenario: Verify multi-stage approval workflow
    Given an offer requires sequential approvals from ELT and CEO
    When the ELT approves the offer
    Then the offer should move to CEO approval stage
    And a new approval task should be created for the CEO
    And the CEO should receive a notification

  @ai-assisted
  Scenario: Verify offer letter preview in approval tab
    Given an offer letter has been uploaded
    When I am reviewing the offer
    Then I should see a preview of the uploaded offer letter
    And I should be able to view the full document
    And the preview should be clearly visible in the approval tab

  @ai-assisted
  Scenario: Verify requisition details display
    Given I am reviewing an offer
    Then I should see the requisition title
    And I should see the requisition ID
    And I should see the department
    And I should see the hiring manager information

  @ai-assisted
  Scenario: Verify offer details display
    Given I am reviewing an offer
    Then I should see the base salary
    And I should see the bonus amount
    And I should see the equity details
    And I should see the relocation package if applicable
    And I should see the sign-on bonus if applicable

  @ai-assisted
  Scenario: Verify current vs expected cost comparison
    Given I am reviewing an offer
    Then I should see the current offer total cost
    And I should see the expected cost from requisition budget
    And I should see the variance between current and expected
    And the variance should be color-coded based on budget compliance

  @ai-assisted
  Scenario: Verify last job compensation display
    Given compensation discovery data exists for the candidate
    When I am reviewing the offer
    Then I should see the candidate's last job compensation
    And I should see salary, bonus, and equity from last job
    And I should be able to compare it with the current offer

  @ai-assisted @duplicate
  Scenario: Verify notification delivery to recruiter on approval
    Given I have approved an offer
    Then the recruiter who created the offer should receive a notification
    And the notification should appear in their in-app notification center
    And the notification should include approval details

  @ai-assisted @duplicate
  Scenario: Verify notification delivery to recruiter on rejection
    Given I have rejected an offer with comments
    Then the recruiter should receive a notification
    And the notification should display in a blue notification box
    And the notification should include all rejection comments
    And the recruiter should be able to view the full feedback

  @ai-assisted
  Scenario: Verify approval task disappears after decision
    Given I have made a decision on an offer (approve or reject)
    When I return to my workspace dashboard
    Then the approval task should no longer appear in my task table
    And the task should be marked as completed

  @ai-assisted @assumed
  Scenario: Verify approval history is tracked
    Given an offer has gone through approval workflow
    When I view the offer history
    Then I should see all approval actions
    And I should see who approved or rejected at each stage
    And I should see timestamps for each action
    And I should see comments associated with each action

  @ai-assisted
  Scenario: Verify AI summary updates as interviews progress
    Given interviews are still ongoing for a candidate
    When new interview scorecards are submitted
    Then the AI summary should update automatically
    And the summary should reflect the latest interview data

  @ai-assisted
  Scenario: Verify audit score calculation with multiple interviews
    Given a candidate has completed multiple interview rounds
    Then the audit score should aggregate data from all interviews
    And each interview should be weighted appropriately
    And the overall score should reflect comprehensive evaluation

  @ai-assisted
  Scenario: Verify approval permissions
    Given I am not assigned as an approver for an offer
    When I attempt to access the offer approval
    Then I should not have access to approve or reject
    And I should see a message indicating insufficient permissions

  @ai-assisted @duplicate
  Scenario: Verify read-only mode restrictions
    Given I am in the offer approval read-only view
    When I attempt to click on any field
    Then the field should not become editable
    And I should not see any edit buttons or controls
    And all data should be displayed for review only

  @ai-assisted @assumed
  Scenario: Verify approval deadline indicator
    Given an offer has been pending approval for extended time
    Then I should see a deadline or urgency indicator
    And the indicator should show how long the offer has been waiting
    And urgent offers should be highlighted

  @ai-assisted @assumed
  Scenario: Verify approval task sorting and filtering
    Given I have multiple approval tasks
    When I view my task table
    Then I should be able to sort tasks by date
    And I should be able to filter by offer type
    And I should be able to filter by urgency

  @ai-assisted @assumed
  Scenario: Verify offer comparison with market data
    Given market compensation data is available
    When I am reviewing an offer
    Then I should see how the offer compares to market benchmarks
    And I should see percentile information
    And I should see recommendations based on market data

  @ai-assisted @invalid
  Given an offer was previously rejected and has been resubmitted,
  When Recruiter review the amended offer,
  Then I should see the changes that were made,
  And the approver should be the same person who originally rejected the offer.
  And the approval process should continue

  @ai-assisted @assumed
  Scenario: Verify bulk approval capability
    Given I have multiple offers to approve from the same requisition
    When I select multiple offers
    Then I should have the option to approve all at once
    And each recruiter should receive individual notifications

  @ai-assisted @assumed
  Scenario: Verify approval analytics
    Given I have approved multiple offers
    When I view my approval analytics
    Then I should see my approval rate
    And I should see average time to approval
    And I should see common rejection reasons

  @ai-assisted @assumed
  Scenario: Verify mobile responsiveness of approval interface
    When I access the approval tab on a mobile device
    Then all offer details should be readable
    And I should be able to scroll through all sections
    And approval buttons should be easily accessible
    And the interface should adapt to smaller screen size

  @ai-assisted @invalid
  Scenario: Verify approval notification settings
    When I access my notification preferences
    Then I should be able to configure approval notifications
    And I should be able to choose notification channels
    And I should be able to set notification frequency

  @ai-assisted @assumed
  Scenario: Verify approval audit trail
    Given an offer has been approved
    When I access the audit trail
    Then I should see complete history of the offer
    And I should see all approvers involved
    And I should see all comments and feedback
    And I should see timestamps for all actions

  @ai-assisted @assumed
  Scenario: Verify error handling during approval
    Given I am approving an offer
    When a system error occurs during submission
    Then I should see an error message
    And my approval should not be lost
    And I should be able to retry the approval

  @ai-assisted @assumed
  Scenario: Verify concurrent approval handling
    Given multiple approvers are reviewing the same offer
    When one approver makes a decision
    Then other approvers should be notified
    And the offer is added for other approver
    And the offer status should update for all viewers
    And duplicate approvals should be prevented

  @ai-assisted @assumed
  Scenario: Verify approval delegation
    Given I need to delegate my approval authority
    When I assign a delegate approver
    Then the delegate should receive the approval task
    And the delegate should have full approval permissions
    And the delegation should be logged in the audit trail

 @ai-assisted
 Scenario Outline: Verify Reject or Request Follow-Up flow without mandatory comments
  Given I am reviewing an Offer in the Approval tab
  When I click "<action>" without entering any comments
  Then I should see a validation error message stating "Comments are required"
  And the "<action>" action should be blocked until comments are provided

  Examples:
    | action           |
    | Reject           |
    | Request Follow-Up |

@ai-assisted
Scenario: Verify recruiter cannot edit offer when status is Pending Approval
  Given an offer has been submitted and its status is "Pending Approval"
  When the recruiter opens the offer in the Compensation tab
  Then all structured fields in the offer form should be read-only
  And the recruiter should not see any "Edit" or "Save" options

@ai-assisted
Scenario: Verify offer approval follows the same approval rules as requisition creation
  Given a requisition approval workflow is configured with sequential approvers (e.g., ELT → CEO)
  And an offer is submitted for approval under that requisition
  When the offer enters the approval process
  Then the offer approval should follow the same approver sequence as defined in the requisition approval rules
  And approval tasks should be created for each approver in the same order
  And notifications should be triggered as per the requisition approval workflow

@ai-assisted
Scenario: Verify recruiter cannot edit offer details after offer is rejected
  Given an offer has been submitted for approval
  And the approver has rejected the offer with mandatory comments
  When the recruiter views the rejected offer
  Then the offer status should be marked as "Rejected"
  And Recruiter should see the approver’s comments displayed below the respective offer section
  And all offer fields should be read-only
  And the recruiter should not be allowed to edit or modify any offer details
  And the recruiter should only be allowed to create a new offer version or resubmit after making required corrections

@ai-assisted
Scenario: Verify Request Follow-Up flow allows recruiter to edit and resubmit same offer
  Given an offer has been submitted for approval
  And the approver has selected "Request Follow-Up" with structured comments
  When the recruiter opens the same offer for review
  Then the recruiter should see the approver’s comments displayed below the respective offer section
  And the offer fields should become editable for making necessary updates
  And the offer status should update to "Pending Approval"

  @ai-assisted
  Scenario: Verify workflow update and approver sequence after offer resubmission post follow-up
  Given an offer was previously sent back for "Request Follow-Up"
  And the recruiter has edited the same offer based on approver feedback
  When the recruiter resubmits the offer for approval
  Then the same approver who requested follow-up should be listed as the first approver in the workflow table
  And a new row should be created in the workflow table reflecting the updated approval cycle
  And once the follow-up approver completes their review, the approval process should continue following the defined sequence
