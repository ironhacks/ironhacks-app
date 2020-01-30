import React from 'react';

export const treatmentText = {
	0: {
		header: <div>
			<p>
				Below you can review the evaluation for your app in three categories: (1) Technology, (2) Analytics, and (3) Visualization. <strong>Remember that Visualization matters the most in this hack.</strong>
			</p>
			<p>
				There are two views: (1) Your peers and (2) Your personal feedback. You can select both views for the current phase and also past completed phases!
			</p>
		</div>,
		ranking: {
			instructions: <div>
				<p>
					Check out others work: Also, please take a look at your peers solutions.  
				</p>
				<p>
					Below, you find a table with your peers: with a 1) a link to their app, and 1) a like button.  We will describe each in more detail.
				</p>
				<ul>
					<li>The link in the first column takes you to their code. Click on the link to check out your fellow participants’ solutions.! You can inspect it, and also reuse it if you want to! We encourage you to re-use components from your peers!
					</li>
					<li>The like button in the third column should be used to select the top 3 that you consider reusing. Select those that you consider to inspect further because they are useful and you want to reuse them! <strong>It is very important that select them by 11.59 pm of evaluation day. Afterwards, none of the other apps will be available for inspection.</strong>
					</li>
				</ul>
				<p>
					<strong>Remember: Please do not forget to select and follow your top 3 apps. They are not available anymore after 11.59 pm of the evaluation day.</strong>To make your app unique consider recombining your own ideas with those you find in other apps! Do not worry, you can reuse up to 50% of others code!
				</p>
			</div>,
		}
	},
	1: {
		header: <div>
			<p>
				On this page, you can review the evaluations for your app in a very detailed way for each category: Technology, Analytics, and Visualization. Below are the results for <strong>Phase 1</strong>.
			</p>
			<p>
				There are two views: (1) "your personal feedback" (private and confidential) and (2) ”Your peers" (showing what other's are doing). You can select the different views by clicking on the tabs below. Just click on the tap ”Your peers" below and you can see other's apps (the actual code) and <strong>pick your top 3 favorite app</strong> in the competition.
			</p>
		</div>,
		ranking: {
			instructions: <div>
				<p>
					Below, you find a table with your peers: with 1) a link to their app, 2) A similarity rating of how similar they are compared to you on scale <strong>from 0 (not similar at all)</strong> to <strong>10 (very similar)</strong> and 3) a like button.  We will describe each in more detail.
				</p>
				<ul>
					<li>The link in the first column takes you to their code. Click on the link to check out your fellow participants’ solutions.! You can inspect it, and also reuse it if you want to! We encourage you to re-use components from your peers!
					</li>
					<li>The second column rates them in terms of similarity. We use similarity rating focused on the <strong>visual components</strong> of your and your peer’s app. A rating of 0 means that the other app is very similar. A rating of 10 implies that the other app is very dissimilar. <strong>Keep in mind that more dissimilar can lead to greater excellence!</strong>
					</li>
					<li>The like button in the third column should be used to select the top 3 that you consider reusing. Select those that you consider to inspect further because they are useful and you want to reuse them! <strong>It is very important that select them by 11.59 pm of evaluation day. Afterwards, none of the other apps will be available for inspection.</strong>
					</li>
				</ul>
				<p><strong>Remember: Please do not forget to select and follow your top 3 apps. They are not available anymore after 11.59 pm of the evaluation day. </strong>	To make your app unique consider recombining your own ideas with those you find in other apps! Do not worry, you can reuse up to 50% of others code!
				</p>
			</div>,
		}
	}
}

export const personalFeddback = {
	title: "Personal feedback",
	subTitle: <div>
		<p>
			How to read your personal feedback. There are three rows that describe your apps performance in the three task dimensions: (1) Technology, (2) Analytics, (3) Visualization. The maximum requirements points that you can achieve <strong>74</strong>, the maximum excellence points are <strong>150</strong>. Keep in mind that Visualizations matters the most.
		</p>
		<p><strong>Keep pushing to earn more points. The more points you more likely you earn more money, reputation, and also skills.</strong>
		</p>
		<p>Remember that your personal feedback are private and confidential. And you shouldn't share with others how many points you have earned.
		</p>
	</div>,
	technology: {
		por: <p>
			Here you can find out how well you master the minimum requirements! In this section, we measure the minimum technical requirements such as the creation of the map, charts ,the use of the parameters require, and the use of the datasets required. For more details go the the section of Technology in the section of excellence (www.ironhacks.com/task).
		</p>,
		efe: <p>
			As specified in the task (www.ironhacks.com/task), we evaluate if your current app was written successfully in the simplest manner.
		</p>,
		weight: '15%',
	},
	analytics: {
		por: <p>As specified in the task (www.ironhacks.com/task), you were asked to correctly rank the districts with respect to three parameters (distance, safety, afforability). The value describes how many correct ranks you have identified for all 4 ranking decision parameters. For more details go the the section of Analytics in the section of requirements (www.ironhacks.com/task).
		</p>,
		efe: <p>
			As specified in the task (www.ironhacks.com/task), we evaluate if your current app presents analyticas solutions by using the parameters and datasets required and beyond. Remember that this measure 'parameter'  captures how many variables you have tried to use in relation to all variables available in the eligable datasets. For more details go the the section of Analytics in the section of excellence (www.ironhacks.com/task).
		</p>,
		weight: '25%',
	},
	visualization: {
		por: <p>As specified in the task (www.ironhacks.com/task), you were asked to visualize and rank correctly the districts with respect to three parameters (distance, safety, afforability). Here we considered the  The value describes how many correct ranks you have identified for all 4 ranking decision parameters. For more details go the the section of Analytics in the section of requirements (www.ironhacks.com/task).
		</p>,
		efeA: <p>
			The visualization component of your solution must inform the final user how to take a decision based on a processed and destiled data to trasnform in valuable information. Therfor, please take in consideration the lessons learnt in the usability training for the way of presenting the information, time that the final user will require to understand the data visualization, etc. For more details go the the section of Information visualization in the section of excellence (www.ironhacks.com/task).
		</p>,
		efeB: <p>
			Below, you can find out tackle the visualization of the data and analytics in your app. Remember, that there very creative ways to visualize metrics. Check out below how your app tackles the visualization task, and how advanced you are in visualization data. Our goal is to turn you into a visualization champion! <br/><br/>
			There are varies ways to visualize data. From barcharts to more novel multidimensional charts. The more variety have the more advanced your visualization, the greater the value displayed.<br/><br/>
			Representing the mandatory parameters in new ways on the map definitely makes your app standing out from the rest. We review how well you visualize the mandatory datasets (distance, safety, affordability) on your maps and charts. The more unique (e.g.interactive) the more advanced your app. For the implication score you can achieve a score from 0 to 100. For more details go the the section of Information visualization in the section of excellence (www.ironhacks.com/task).
		</p>,
		weight: '60%',
	},
}
