Feature: User Login
  As a new user
  I want to login to MadridBet922
  So that I can place bets

  Scenario: Login page required elements are displayed
    Given I am on the MadridBet922 homepage
    When I click on the login button
    Then I should be registered successfully
    And I should see a welcome message