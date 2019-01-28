import React from 'react';

export const treatmentText = {
	0: {
		header: <div>
			<p>
				On this page, you can review the evaluations for your app in a very detailed way for each category: Technology, Analytics, and Visualization. Below are the results for Phase 1. Remember that the InfoVisdimension matters the most.
			</p>
			<p>
				There are two views: (1) "your personal feedback" (private and confidential) and (2) "your peers" (where you can see other's apps (the actual code) and pick your top 3 favorite appin the competition). You can select the different views by clicking on the tabs below.
			</p>
		</div>,
		ranking: {
			intructions: <div>
				<p>
					<strong>Check out others' work:</strong> Also, please take a look at your fellow participants’ solutions. <br/> Below, you find a table with your peers in your hacking group with three  things to inspect or take action upon: 1) A link to their app, 2) A rating of how similar they are compared to you on scale from 0 (not similar at all to 1 very similar) and 3) a like button. 
				</p>
				<ul>
					<li>The link in the first column takes you to their code. <strong>Click on the link</strong> to check out your fellow participants’ solutions.! You can <strong>inspect</strong> it, and also <strong>reuse</strong> it if you want to! <strong>We encourage you to re-use components from your peers!</strong>
					</li>
					<li><strong>Give a like</strong> to your <strong>top 3 that you consider reusing:</strong> Select those that you consider to inspect further because they are useful and you want to reuse them! It is very important that you rate your most favorite app as it will give us an idea how much you try to improve! Keep in mind that this will also tell us how much you try to improve and develop a unique app! 
					</li>
				</ul>
				<p><strong>How to read the similarity rankings?</strong> We use similarity scores to measure how similar your app, and the other hacker’s app is with respect of the visual components of your app. So the more dissimilar from others  you are the better! Try to become more dissimilar and start exploring those that are dissimilar! The rating in the second column evaluates their similarity on scale from 0 ((not similar at all) to 10 (very similar). <br/>
					<strong>Remember:</strong> Please write down the number of the hackers that you liked! You might want to look at those in the next round again. To make your app unique consider recombining your own ideas with those you find in other apps! Do not worry <strong>you can reuse up to 50%</strong> of others code!
				</p>
			</div>
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
					There is a view <strong>"Your peers"</strong> (showing what other's are doing). You can select the different views by clicking on the tabs below. <br/>
					<strong>Check out your peers that compete with you:</strong> Below, you find a table with your peers in your hacking group with three columns: 1) A link to their app, and 2) a like button.  
				</p>
				<ul>
					<li>Click on the link to check out other's code! You can inspect it, and also reuse it if you want to! It is allowed and actually encouraged! Go for it, learn from others. Only 50 % of the code needs to be from yourself! Do not worry! ".  Please take a look at your fellow participants’ solutions. Keep in mind: We encourage you to re-use components from your peers! The more you recombine existing work in novel ways the better. 
					</li>
					<li>The second column gives you the opportunity to select your top 3 apps: Select those that you consider to inspect further because they are useful and you want to learn from there! It is very important that you rate your most favorite app as it will give us an idea how much you try to improve! 
					</li>
				</ul>
			</div>
		}
	}
}

export const personalFeddback = {
	title: "Personal feedback",
	subTitle: <div>
		<p>
			How to read your personal feedback. <strong>There are three different scrollable tables that give you a rough idea of how well your app is improving in terms of minimum requirements and also excellence. Keep in mind: Fulfilling the minimum requirements is not enough. Keep pushing to increase the excellence of your app.</strong> The more novel and unique your app the higher your reward eventually. And remember: The InfoVis Dimension matters the most. Stand out from the crowd!! 

		</p>
	</div>,
	technology: {
		por: <ul>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
		</ul>,
		efe: <p>
			How to read your personal feedback. <strong>There are three different scrollable tables that give you a rough idea of how well your app is improving in terms of minimum requirements and also excellence. Keep in mind: Fulfilling the minimum requirements is not enough. Keep pushing to increase the excellence of your app.</strong><br/> The more novel and unique your app the higher your reward eventually. And remember: The InfoVis Dimension matters the most. Stand out from the crowd!! 
		</p>,
		weight: '15%',
	},
	analytics: {
		por: <ul>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
		</ul>,
		efe: <p>
			How to read your personal feedback. <strong>There are three different scrollable tables that give you a rough idea of how well your app is improving in terms of minimum requirements and also excellence. Keep in mind: Fulfilling the minimum requirements is not enough. Keep pushing to increase the excellence of your app.</strong><br/> The more novel and unique your app the higher your reward eventually. And remember: The InfoVis Dimension matters the most. Stand out from the crowd!! 
		</p>,
		weight: '25%',
	},
	infoVis: {
		por: <ul>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
			<li>this is a requirement</li>
		</ul>,
		efe: <p>
			How to read your personal feedback. <strong>There are three different scrollable tables that give you a rough idea of how well your app is improving in terms of minimum requirements and also excellence. Keep in mind: Fulfilling the minimum requirements is not enough. Keep pushing to increase the excellence of your app.</strong><br/> The more novel and unique your app the higher your reward eventually. And remember: The InfoVis Dimension matters the most. Stand out from the crowd!! 
		</p>,
		weight: '60%',
	},
}