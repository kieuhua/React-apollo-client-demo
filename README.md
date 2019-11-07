### Features
This is React Apollo Client application, it uses Query component and Mutation component from react-apollo to query github respositories.
User can get Organization like Facebook, Google github repositories or user personal github repositories (https://github.com/kieuhua).

- search for organization in the search field, and It will list the repositories with pagination feature.
-  click on Start or Watch buttons for each repository
-  click on "Show Open Issues" , "Show Closed Issues" or "Hide Issues" for individual repository.

### Screenshots ###
see doc/screenshots for outputs of react apollo clients
- root_page.png
- Profile_Organization_search_field.png 
- google_orginaztion_page.png 
- kieuhua_profile_page.png
- facebook_open_issues_page.png
- Watch_Star_buttons.png
- Unwatch_Unstar_buttons.png
- more_button.png

### Main Components

####1) index.js
- create HttpLink to github graphql
- create errorLink
- create ApolloLink from HttpLink and errorLink
- create InMemoryCache()
- create ApploClient from ApolloLInk and InMemoryCache

#### 2) App Component
Create Navigation component  with two routes - Organization route and Profile route and OrganizationSearch search field

http://localhost:3000/;   doc/screenshots/root_page.png; Profile_Organization_searchfield.png

#### 3) Organization Component 
	Query github for Organization repositories, and it uses React render props pattern to get the result from the query; then call <RepositoryList> to list the repository items.
	doc/screenshots/google_organization_page.png

#### 4) Profile Component
Query github repositories of current user with pageInfo for pagination 
doc/screenshots/kieuhua_profile_page.png

#### 5) Respository Component
	- create reusable query in fragments.js
	- list the respoistories with RespositoryList component 
##### RespositoryItem component for each repository
	- RespositoryItem component display repository information, creates Mutation query to update Watch field and Star fields, it also use optimistic UI strategy, expect the mutation result to be true first. 
		( Watch_Star_buttons.png, Unwatch_Unstar_bottons.png)
##### RepositoryList Component
		call <RepositoryItem> component with <Inssues> component for each respository
		display  FetchMore component if hasNextPage true (see doc/screenshots/more_button.png)

#### 6) Issue Component
##### IssueItem component
Display individual issue from the IssueList component.
##### IssueList component
- Display Issue list of particular repository. it queries five issues at a time. When user click on “Show Open Issues”, display each issue with IssueItem component.
- User can click on “Show Closed Issues” display Closed issues, Finally when user click on “Hide Issues” then hide all issues.
		doc/screenshots/facebook_open_issue_page.png

#### 7) FetchMore Component		
	FetchMore component displays "More Repositories" button, if hasNextPage true.
	doc/screenshots/more_button.png



