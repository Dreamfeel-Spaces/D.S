import { prisma } from '$lib/db/prisma';

export const Space = {
	async findOneById(appId: string) {
		return prisma.space.findUnique({
			where: { appId }
		});
	},
	async withRestData(appId: string) {
		return prisma.space.findUnique({
			where: { appId },
			include: {
				apiSetup: true,
				onboarding: true,
				roles: true,
				tables: {
					include: {
						columns: true
					}
				}
			}
		});
	},
	async findUserById(id: string) {},
	async withAppDetailData(appId: string, userId: string) {
		if (userId)
			return prisma.space.findUnique({
				where: { appId },
				include: {
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: true
						}
					},
					users: {
						where: {
							id: userId
						},
						include: {
							role: true
						}
					}
				}
			});
		else
			return prisma.space.findUnique({
				where: { appId },
				include: {
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: true
						}
					}
				}
			});
	},
	async withDashboardData(appId: string, userId: string) {
		if (userId) {
			return prisma.space.findUnique({
				where: { appId },
				include: {
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: true,
							rows: {
								include: {
									_count: true
								}
							}
						}
					},
					users: {
						where: {
							id: userId
						},
						include: {
							role: true
						}
					}
				}
			});
		} else {
			return prisma.space.findUnique({
				where: { appId },
				include: {
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: true,
							rows: {
								include: {
									_count: true
								}
							}
						}
					}
				}
			});
		}
	},
	async withUIData(appId: string, userId: string) {
		if (userId) {
			return prisma.space.findUnique({
				where: { appId },
				include: {
					roles: true,
					tables: {
						include: {
							columns: true,
							rows: {
								include: {
									_count: true
								}
							}
						}
					},
					spaceUis: {
						include: {
							spaceUIVersion: true
						}
					},
					users: {
						where: {
							id: userId
						},
						include: {
							role: true
						}
					}
				}
			});
		} else {
			return prisma.space.findUnique({
				where: { appId },
				include: {
					roles: true,
					tables: {
						include: {
							columns: true,
							rows: {
								include: {
									_count: true
								}
							}
						}
					},
					spaceUis: {
						include: {
							spaceUIVersion: true
						}
					}
				}
			});
		}
	},
	async withDashboardOverviewMetaData(appId: string, userId: string) {
		return prisma.space.findUnique({
			where: {
				appId
			},
			include: {
				permissions: true,
				dashboards: true,
				tables: {
					include: {
						columns: {
							include: {
								options: true
							}
						},
						reports: {
							include: {
								fields: {
									include: {
										field: true
									}
								},
								filters: true,
								SQT: true
							}
						},
						charts: {
							include: {
								fields: {
									include: {
										field: true
									}
								}
							}
						},
						dashboardForms: {
							include: {
								fields: {
									include: {
										field: true
									}
								},
								SQT: true
							}
						},
						rows: {
							include: {
								tableData: true
							}
						},
						aPICreatePermissions: {
							include: {
								userRoles: true
							}
						},
						aPIGETPermissions: {
							include: {
								userRoles: true
							}
						},
						aPIUpdatePermissions: {
							include: {
								userRoles: true
							}
						},
						aPIDeletePermissions: {
							include: {
								userRoles: true
							}
						}
					}
				},
				roles: true,
				users: {
					where: {
						id: userId
					},
					include: {
						role: true
					}
				}
			}
		});
	},
	async withRestMetaData(appId: string, userId: string) {
		if (userId)
			return prisma.space.findUnique({
				where: {
					appId
				},
				include: {
					permissions: true,
					dashboards: true,
					apiSetup: true,
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: {
								include: {
									options: true
								}
							},
							reports: {
								include: {
									fields: {
										include: {
											field: true
										}
									},
									filters: true,
									SQT: true
								}
							},
							charts: {
								include: {
									fields: {
										include: {
											field: true
										}
									}
								}
							},
							dashboardForms: {
								include: {
									fields: {
										include: {
											field: true
										}
									},
									SQT: true
								}
							},
							rows: {
								include: {
									tableData: true
								}
							},
							aPICreatePermissions: {
								include: {
									userRoles: true
								}
							},
							aPIGETPermissions: {
								include: {
									userRoles: true
								}
							},
							aPIUpdatePermissions: {
								include: {
									userRoles: true
								}
							},
							aPIDeletePermissions: {
								include: {
									userRoles: true
								}
							}
						}
					},
					users: {
						where: {
							id: userId
						},
						include: {
							role: true
						}
					}
				}
			});
		else
			return prisma.space.findUnique({
				where: {
					appId
				},
				include: {
					permissions: true,
					dashboards: true,
					apiSetup: true,
					onboarding: true,
					roles: true,
					tables: {
						include: {
							columns: {
								include: {
									options: true
								}
							},
							reports: {
								include: {
									fields: {
										include: {
											field: true
										}
									},
									filters: true,
									SQT: true
								}
							},
							charts: {
								include: {
									fields: {
										include: {
											field: true
										}
									}
								}
							},
							dashboardForms: {
								include: {
									fields: {
										include: {
											field: true
										}
									},
									SQT: true
								}
							},
							rows: {
								include: {
									tableData: true
								}
							},
							aPICreatePermissions: {
								include: {
									userRoles: true
								}
							},
							aPIGETPermissions: {
								include: {
									userRoles: true
								}
							},
							aPIUpdatePermissions: {
								include: {
									userRoles: true
								}
							},
							aPIDeletePermissions: {
								include: {
									userRoles: true
								}
							}
						}
					}
				}
			});
	}
};
